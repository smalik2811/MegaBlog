import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
    AddPostPage,
    MyPostsPage,
    AuthLayout,
    EditPostPage,
    HomePage,
    LoginPage,
    PostPage,
    SignupPage,
} from "./components";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: (
                    <AuthLayout authenticationRequired={false}>
                        <LoginPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/signup",
                element: (
                    <AuthLayout authenticationRequired={false}>
                        <SignupPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/my-posts",
                element: (
                    <AuthLayout authenticationRequired={true}>
                        {" "}
                        <MyPostsPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <AuthLayout authenticationRequired={true}>
                        {" "}
                        <AddPostPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <AuthLayout authenticationRequired={true}>
                        {" "}
                        <EditPostPage />
                    </AuthLayout>
                ),
            },
            {
                path: "/post/:slug",
                element: (
                    <AuthLayout authenticationRequired={false}>
                        <PostPage />
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
