export interface Account {
    id: string;
    owner: string;
    balance: string;
    created_at: string;
}

export interface Transaction {
    id: string;
    account_id: string;
    type: "deposit" | "withdraw" | "transfer";
    amount: string;
    created_at: string
}

export interface ApiResponse<T>{
    success: boolean;
    data: T;
    message?: string;
}