import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const links = [
    {
        name: "Profile",
        href: "/profile",
    },
    {
        name: "Books",
        href: "/books",
    },
    {
        name: "Category",
        href: "/category",
    },
    {
        name: "Report",
        href: "/report",
    },
];

export default function MenuItems() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.clear();
        navigate("/");
    };


    return (
        <div className="py-1">
            {links.map((link) => {
                return (
                    <Link
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        key={link.name}
                        to={link.href}
                    >
                        {link.name}
                    </Link>
                );
            })}
            <div
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={handleClick}>
                Log out
            </div>
        </div>
    );
}
