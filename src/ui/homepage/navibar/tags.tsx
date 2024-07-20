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
            {links.map((link) => {
                const LinkIcon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                    <Link
                        className={clsx("flex content-center items-center text-stone-600",
                            {
                                "bg-stone-400 text-stone-900": isActive,
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
        </>
    );
}