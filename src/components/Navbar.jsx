import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

export default function Navbar(){
  const dispatch = useDispatch();

const isAuthenticated = useSelector((state) => {
  console.log('State in selector:', state);
  return state.auth.isAuthenticated;
});

  const email = useSelector(state=>state.auth.user.email)
  const navigate = useNavigate();

  const handleLogout = () =>{
    console.log("areee yarrrr...."+email);
    dispatch(logout(email));
    navigate("/login");
  }
    return(
<>
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Bakery</a>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className={({isActive})=>(isActive?"active nav-link":"nav-link")} aria-current="page" to="/">Home</NavLink>
        </li>
        {!isAuthenticated &&
        <>
              <li className="nav-item">
                <NavLink className={({isActive})=>(isActive?"active nav-link":"nav-link")}to="/signup">Signup</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({isActive})=>(isActive?"active nav-link":"nav-link")} to="/login">Login</NavLink>
              </li>  
        </>    
        } 
      </ul>
      {isAuthenticated && 
            <div className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success">{email? email:""}</button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>LogOut</button>
          </div>
      }
    </div>
  </div>
</nav>                                                               
</>
    );
}