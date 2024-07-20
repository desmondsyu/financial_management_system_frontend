import Logo from "../../logo";
import Tags from "./tags";
import Avatar from "./avatar";

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