export type FetchError = {
    message: string | null,
}

export type Textfield = {
    type: "text" | "email" | "number" | "date" | "button" | "password",
    label?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
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

