import BookList from "../../ui/menuitems/books/book-list";
import Button from "../../ui/button";
import Search from "../../ui/search";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Page() {
    const [searchParams] = useSearchParams();
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const handleCreateClick = () => {
        setIsCreating(true);
    }

    return (
        <>
            <div className="flex items-center ">
                <Search placeholder="Search books..." />
                <Button label="Create" disabled={isCreating} onClick={handleCreateClick}/>
            </div>
            <BookList searchTerm={searchParams.get("query") || ""} />
        </>
    );
}