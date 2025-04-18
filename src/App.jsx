import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/AuthService";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    });

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main className="min-h-screen">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : (
        <h1>Loading...</h1>
    );
}

export default App;
