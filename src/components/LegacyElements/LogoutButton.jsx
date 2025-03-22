import { useDispatch } from "react-redux";
import authService from "../../appwrite/AuthService";
import { logout } from "../../store/authSlice";
import { Button } from "../index";

const LogoutButton = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout().then(() => dispatch(logout()));
    };
    return (
        <Button
            className="inline-block px-6 py-2 duration-200 bg-red-700 hover:bg-red-600 rounded-full"
            onClick={logoutHandler}
        >
            Logout
        </Button>
    );
};
export default LogoutButton;
