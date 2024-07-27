import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
            <p className="text-lg text-gray-700 mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}