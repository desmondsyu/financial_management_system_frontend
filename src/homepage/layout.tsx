import { Outlet } from "react-router-dom";
import Navibar from "../ui/homepage/navibar/navibar";

export default function Layout() {
    return (
        <>
            <div className="z-10">
                <Navibar />
            </div>
            <div className="z-0">
                <Outlet />
            </div>
        </>
    );
}

