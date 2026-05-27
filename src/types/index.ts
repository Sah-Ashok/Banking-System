export interface Account {
    id: string;
    owner: string;
    balance: number;
    created_at: Date;
}


export interface Transaction {
    id: string;
    account_id: string;
     type: "deposit" | "withdraw" | "transfer";
    amount: number;
    created_at: Date;
}

export interface CreateAccountDTO {
    owner: string;
    initialBalance: number;
}

export interface AccountAmountDTO {
    accountId: string;
    amount: number;
}

export type DepositDTO = AccountAmountDTO;

export type WithdrawDTO = AccountAmountDTO;

export interface TransferDTO {
    fromAccountId: string;
    toAccountId: string;
    amount: number;
}