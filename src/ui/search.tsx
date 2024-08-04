import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import {
    Form,
    useSubmit,
} from "react-router-dom";

export default function Search({ placeholder }: { placeholder: string }) {

    const submit = useSubmit();

    return (
        <Form role="search" className="flex">
            <label>Search</label>
            <input
                placeholder={placeholder}
                type="search"
                name="query"
                onChange={(e) => {
                    submit(e.currentTarget.form);
                }}
            />
            <MagnifyingGlassCircleIcon />
        </Form>
    );
}