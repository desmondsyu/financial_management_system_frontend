import React from "react";
import { Outlet } from "react-router-dom";
import Navibar from "../ui/homepage/navibar/navibar.tsx";

export default function Layout() {
    return (
        <>
            <div>
                <Navibar />
            </div>
            <div>
                <Outlet />
            </div>
        </>
    );
}

