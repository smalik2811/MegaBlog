import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
    Home,
    AuthLayout,
    LoginPage,
    SignupPage,
    AllPosts,
    AddPost,
    EditPost,
    Post,
} from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authenticationRquired={false}>
                        <LoginPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authenticationRquired={false}>
                        <SignupPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <AuthLayout authenticationRquired={true}>
                        {" "}
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authenticationRquired={false}>
                        {" "}
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post/:slug",
                element: (
                    <AuthLayout authenticationRquired={false}>
                        {" "}
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: (
                    <AuthLayout authenticationRquired={false}>
                        <Post />
                    </AuthLayout>
                ),
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
