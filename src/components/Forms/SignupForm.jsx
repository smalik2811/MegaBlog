import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router";
import authService from "../../appwrite/AuthService";
import { login as stateLogin } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import { Logo, Input, Button } from "../index";
import { useState } from "react";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");

    const createAccount = async (data) => {
        setError("");
        try {
            const session = await authService.createAccount(data);
            if (session) {
                const user = await authService.getCurrentUser();
                if (user) {
                    dispatch(stateLogin(user));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-between">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline ms-2"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit(createAccount)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <p className="text-red-500">
                                {errors.name.message}
                            </p>
                        )}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatter: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                                            value
                                        ) || "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        <Button type="submit" className="w-full">
                            Sign Up
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignupForm;
