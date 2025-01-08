import React, { useState } from 'react';
import { register } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    email:"",
    password:"",
    confirmPassword: ""
  })

  const navigate = useNavigate();

  const {mutate,status:loadingStatus} = useMutation({
    mutationFn: register,
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
    onSuccess: (data) => {
      toast.success("Signup successful");
      navigate("/login");
      console.log(data);
    }
  });

  const handleChange = (e)=>{

    const {name,value} = e.target;
    setFormData(prev => ({
        ...prev,
        [name]:value,
    }))

    if(errors[name]){
        setErrors(prev => ({
            ...prev,
            [name]:""
        }))
    }
  }

  const validateForm = () => {
    let tempError = {};
    let isValid = true;

    if (!formData.username) {
      tempError.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      tempError.username = "Username should be at least 3 characters long";
      isValid = false;
    }

    if (!formData.email) {
      tempError.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempError.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.password) {
      tempError.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      tempError.password = "Password should be minimum 8 characters long";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      tempError.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      tempError.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempError);
    return isValid;
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();

    if(!validateForm()){
        return;
    }

    const data = {
        ...formData,
        roleName: "ROLE_USER"
    }
    delete data.confirmPassword;
    console.log(data);

      // const response = await authService.register(data);

    mutate(data);

    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ""
    });
    setErrors({
      email:"",
      password:"",
      confirmPassword: ""
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header text-center">
              <h3 className="mb-0">Sign Up</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    disabled={loadingStatus === "pending"}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                  )}
                </div>

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

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loadingStatus === "pending"}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
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
                  ) : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;