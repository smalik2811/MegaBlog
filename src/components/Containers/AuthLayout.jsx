import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AuthLayout = ({ children, authenticationRequired = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.auth.isUserAuthenticated);

    useEffect(() => {
        if (authenticationRequired && authStatus !== authenticationRequired) {
            navigate("/login");
        }
        setLoader(false);
    }, [authStatus, navigate, authenticationRequired]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
};
export default AuthLayout;
