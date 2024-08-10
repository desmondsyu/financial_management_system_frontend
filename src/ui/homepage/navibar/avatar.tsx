import { useState } from "react";
import MenuItems from "./menuitems";
import { getUserFromStorage } from "../../../lib/currentuser";
export default function Avatar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    const image = `https://robohash.org/${getUserFromStorage().username}`;

    return (
        <>
            <a
                className="flex content-center items-center text-stone-900 pr-5 relative"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            >
                <img src={image} alt="profile-img" className="mr-2 w-auto h-10 rounded-full border-2 border-grey bg-white"/>
                <p>Hi, {getUserFromStorage().username}!</p>
            </a>

            {showMenu &&
                <div className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md ">
                    <MenuItems />
                </div>
            }
        </>
    );
}
