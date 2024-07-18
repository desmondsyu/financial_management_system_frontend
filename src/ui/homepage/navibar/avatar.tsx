import React, { useState } from "react";
import MenuItems from "./menuitems.tsx";

export default function Avatar() {
    const [showMenu, setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <a
                className="flex content-center items-center text-stone-900 pr-5 relative"
                onClick={handleClick}
                style={{ cursor: "pointer" }}
            >
                <p>Hi, [Username]!</p>
            </a>

            {showMenu &&
                <div className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md ">
                    <MenuItems />
                </div>
            }
        </>
    );
}
