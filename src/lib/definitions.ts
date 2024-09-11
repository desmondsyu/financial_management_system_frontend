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
    step?: number,
    min?: number,
};

export type User = {
    id: number,
    username: string,
    password: string,
    dob?: string,
    email: string,
    gender?: string,
    active: boolean,
}

export type Labels = {
    id: number,
    name: string,
    user: User,
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
    id: number,
    user: {
        id?: number,
        username?: string,
        dob?: string,
        email: string,
        gender?: string,
        active?: boolean,
    },
    hashcode: string,
    label?: Labels,
    type: TransactionType,
    transactionDate: string,
    amount: number,
    description?: string,
    balance: number,
    transactionGroup: Category,
}

export type TransactionPage = {
    content: Transaction[],
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number,
}

export type SpendingData = {
    current_spending: number,
    expected_spending: number,
    upper_bound_yellow_max: number,
    max_bound_red_max: number,
    percent_of_spending: number,
}

export type TrendData = {
    date: string,
    month_spending: number,
    month_income: number,
}

export type GroupData = {
    date: string,
    group_name: string,
    amount: number,
    type: "Income" | "Expense",
}

export type TypeGroupData = {
    Income: GroupData[],
    Expense: GroupData[],
}

export type LabelGroupData = {
    data: string,
    label_name: string,
    amount: number,
}

export type UploadResult = {
    successfulTransactions: Transaction[],
    failedTransactions: {
        line: number,
        reason: string,
    }[],
}

export type RecurringTransaction = {
    id: number,
    transaction: Transaction,
    frequency: string,
    endDate: string,
}

