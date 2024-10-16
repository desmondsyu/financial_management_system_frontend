import { useState, useEffect, useRef } from "react";
import MenuItems from "./menuitems";
import { getUserFromStorage } from "../../../lib/currentuser";

export default function Avatar() {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMenuClose = () => {
        setShowMenu(false);
    };

    const image = `https://robohash.org/${getUserFromStorage().username}`;

    return (
        <>
            <a
                className="flex content-center items-center text-stone-900 pr-5 relative"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            >
                <img src={image} alt="profile-img" className="mr-2 w-10 h-10 rounded-full border-2 border-grey bg-white" />
                <p className="hidden md:block">Hi, {getUserFromStorage().username}!</p>
            </a>

            {showMenu && (
                <div
                    ref={menuRef}
                    className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md z-40"
                >
                    <MenuItems onMenuClose={handleMenuClose} />
                </div>
            )}
        </>
    );
}