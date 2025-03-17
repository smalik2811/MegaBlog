import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Protected = ({ children, authenticationRquired = true }) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state) => state.isAuthenticated);

    useEffect(() => {
        if (authenticationRquired && authStatus !== authenticationRquired) {
            navigate("/login");
        } else if (
            !authenticationRquired &&
            authStatus !== authenticationRquired
        ) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authenticationRquired]);

    return loader ? <h1>Loading...</h1> : { children };
};
export default Protected;
