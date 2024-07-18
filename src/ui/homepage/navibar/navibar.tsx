import React from "react";
import Logo from "../../logo.tsx";
import Tags from "./tags.tsx";
import Avatar from "./avatar.tsx";

export default function Navibar() {
    return (
        <div className="h-12 w-full flex justify-between bg-stone-200 mb-5">
            <Logo />
            <div className="flex">
                <Tags />
            </div>
            <Avatar />
        </div>
    );
}