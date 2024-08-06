export type FetchError = {
    message: string | null,
}

export type Textfield = {
    type: "text" | "email" | "number" | "date" | "button" | "password",
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    name?: string,
    value?: string,
    placeholder?: string,
    disabled: boolean,
    required: boolean,
};

export type User = {
    id: number,
    username: string,
    password: string,
    dob?: string,
    email: string,
    mStatus?: string,
    active: boolean,
}

export type Labels = {
    id: number,
    name: string,
}

export type TransactionType = {
    id: number,
    name: string,
}

export type Category = {
    id: number,
    name: string,
    transactionType: TransactionType,
    user?: User,
}

export type Transaction = {
    content: [
        {
            user: {
                username: string,
            },
            hashcode: string,
            label: Labels,
            transactionDate: string,
            amount: number,
            description: string,
            balance: number,
            transactionGroup: Category
        }
    ],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
}

