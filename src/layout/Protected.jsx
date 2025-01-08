import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cookie from 'js-cookie'
import { logout } from "../store/authSlice";
import { useEffect } from "react";

function ProtectedPages(){

    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const email = useSelector(state=>state.auth.user.email)
    const cookie_1 = Cookie.get("accessToken");
    const cookie_2 = Cookie.get("refreshToken");
    const Authenticated = isAuthenticated && cookie_1 && cookie_2;

    useEffect(()=>{
        console.log("checking state");
        console.log("authenticated", Authenticated);
        if(!Authenticated){
            dispatch(logout(email));
        }
    },);

return(
    <>
        <Navbar />

        {Authenticated ? <Outlet />:<Navigate to="/login" />}
    </>

);
}

export default ProtectedPages;