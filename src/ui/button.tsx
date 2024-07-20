import { useNavigate } from "react-router-dom";

interface ButtonProps {
    label: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    disabled: boolean,
    navigateTo?: string;
}

export default function Button(
    {
        label,
        onClick,
        disabled,
        navigateTo,
    }: ButtonProps
) {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);
        if (navigateTo) navigate(navigateTo);
    };

    return (
        <div className="flex justify-center p-5">
            <button
                className="w-4/5 leading-10 text-md bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-md text-white transition duration-200 ease-in-out transform hover:scale-105 disabled:bg-blue-300 disabled:cursor-not-allowed"
                onClick={handleClick}
                disabled={disabled}
            >
                {label}
            </button>
        </div>
    );
}