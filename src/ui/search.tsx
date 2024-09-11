import {
    Form,
    useSubmit,
} from "react-router-dom";

export default function Search({ placeholder }: { placeholder: string }) {

    const submit = useSubmit();

    return (
        <Form role="search" className="flex content-center items-center justify-center w-full">
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                placeholder={placeholder}
                type="search"
                name="query"
                onChange={(e) => {
                    submit(e.currentTarget.form);
                }}
            />
        </Form>
    );
}