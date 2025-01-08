import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { login } from "../service/authService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

type LoginResponse = {
  id:number;
  email:string;
};

type FormData = {
  email:string;
  password:string;
};

type FormErrors = {
  email:string;
  password:string;
};

function LoginPage(){

    const [formData, setFormData] = useState<FormData>({
        email:"",
        password:""
    })

    const [errors, setErrors] = useState<FormErrors>({
        email:"",
        password:"",
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {mutate, status:loadingStatus} = useMutation({
      mutationFn:login,
      onError:(error:any)=>{
        const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
        toast.error(errorMessage);
      },
      onSuccess:(data:LoginResponse)=>{
        toast.success("Login successful");
        dispatch(authActions.login({
          id:data.id,
          email:data.email,
      }));
        navigate("/");
        console.log(data);
      }
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        const {name,value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }))

        if(errors[name as keyof FormErrors]){
            setErrors(prev => ({
                ...prev,
                [name]:""
            }))
        }
    };

    const validateForm = ():boolean =>{
        let tempError: Partial<FormErrors> = {};
        let isValid = true;
        
        if(!formData.email){
            tempError.email = "Email is required";
            isValid = false;
        } else if(!/\S+@\S+\.\S+/.test(formData.email)) {
            tempError.email = "Email is invalid";
            isValid = false;
        }

        if(!formData.password){
            tempError.password = "Password is required";
            isValid = false;
        } else if(formData.password.length < 8 ) {
            tempError.password = "Password should be minimun 8 characters long";
            isValid = false;
        }

        setErrors(tempError as FormErrors);
    return isValid;
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!validateForm()){
            return;
        }

        const credentials = {
          ...formData
        };
          // const response = await authService.login(credentials);
          mutate(credentials);
    }

return(
    <div className="container">
    <div className="row justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card">
          <div className="card-header text-center">
            <h3 className="mb-0">Login</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loadingStatus === "pending"}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loadingStatus === "pending"}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={loadingStatus === "pending"}
                >
                {loadingStatus === "pending" ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
export default LoginPage;