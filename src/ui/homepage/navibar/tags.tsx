import { BanknotesIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
    {
        name: "Transactions",
        href: "/transactions",
        icon: BanknotesIcon,
    },
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: ChartBarIcon,
    },
];

export default function Tags() {
    const location = useLocation();
    return (
        <>
            <div className="hidden sm:flex">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            className={clsx("flex content-center items-center text-stone-600",
                                {
                                    "bg-cashcalmselect text-stone-900": isActive,
                                    "hover:bg-gray-200": !isActive,
                                },
                            )}
                            key={link.name}
                            to={link.href}
                        >
                            <LinkIcon className="h-3/4 m-1" />
                            <p className="m-1">{link.name}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="fixed bottom-0 left-0 w-full h-12 sm:hidden flex justify-around bg-cashcalmtheme z-40 shadow-lg border-t border-stone-300">
                {links.map((link) => {
                    const LinkIcon = link.icon;
                    const isActive = location.pathname === link.href;
                    return (
                        <Link
                            className={clsx("flex flex-col w-1/2 items-center justify-center text-stone-600 transition-all duration-200 ease-in-out",
                                {
                                    "bg-cashcalmselect text-stone-900 font-semibold": isActive,
                                    "hover:bg-gray-200": !isActive,
                                },
                            )}
                            key={link.name}
                            to={link.href}
                        >
                            <LinkIcon className="h-6 w-6 mb-1" />
                            <p className="text-xs">{link.name}</p>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}