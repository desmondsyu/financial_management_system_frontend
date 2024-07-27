import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import {
    Form,
    useSubmit,
    useSearchParams,
    useNavigation,
} from "react-router-dom";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const navigation = useNavigation();
    const submit = useSubmit();

    return (
        <Form role="search">
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