import { MinusIcon } from "@heroicons/react/24/outline";
import type { transaction_group } from "@prisma/client";

interface ItemProps {
    categories: transaction_group[];
}

export default function Item({categories}: ItemProps) {
    return (
        <div>
            {categories?.map((category) => (
                <div key={category.id}>
                    <p>{category.name}</p>
                    <div>
                        <MinusIcon />
                    </div>
                </div>
            ))}
        </div>
    );
}