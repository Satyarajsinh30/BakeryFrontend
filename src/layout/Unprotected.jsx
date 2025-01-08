import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function UnprotectedPages(){

    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);

return(
    <>
        <Navbar />
        {isAuthenticated ? <Navigate to="/" />:<Outlet />}
    </>

);
}

export default UnprotectedPages;