import { Outlet } from "react-router-dom";
import Navibar from "../ui/homepage/navibar/navibar";
import FeedBack from "../ui/feedback";

export default function Layout() {
    return (
        <>
            <div>
                <Navibar />
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <FeedBack />
            </div>
        </>
    );
}

