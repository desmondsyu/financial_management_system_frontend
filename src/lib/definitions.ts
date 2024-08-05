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
    dob?: Date,
    email: string,
    getmStatus?: string,
    active: boolean,
}

export type Labels = {
    id: number,
    name: string,
    user?: User,
}

export type Type = {
    id: number,
    name: string,
}

export type Category = {
    id: number,
    name: string,
    transactionType: Type,
    user?: User,
}

