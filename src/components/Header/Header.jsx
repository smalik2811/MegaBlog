import { Container, Logo, LogoutButton } from "../index";
import { useNavigate, Link } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
    const isAuthenticated = useSelector(
        (state) => state.auth.isUserAuthenticated
    );
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !isAuthenticated,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !isAuthenticated,
        },
        {
            name: "My Posts",
            slug: "/my-posts",
            active: isAuthenticated,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: isAuthenticated,
        },
    ];

    return (
        <header className="py-3 shadow bg-gray-500 sticky top-0 z-50">
            <Container>
                <nav className="flex items-center">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((navItem) =>
                            navItem.active ? (
                                <li key={navItem.name}>
                                    <button
                                        onClick={() => navigate(navItem.slug)}
                                        className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                                    >
                                        {navItem.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {isAuthenticated && (
                            <li>
                                <LogoutButton className="bg-red-600" />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
};
export default Header;
