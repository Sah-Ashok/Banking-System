import {v4 as uuidv4} from "uuid";
import type {Account , Transaction , CreateAccountDTO , AccountAmountDTO  , TransferDTO} from "../types";
import pool from "../config/db";


export const createAccount = async (data: CreateAccountDTO): Promise<Account | null> => {
  const result = await pool.query<Account>(
    `INSERT INTO accounts (id, owner, balance, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING *`,
    [uuidv4(), data.owner, data.initialBalance]
  );
  return result.rows[0] || null;
};

export const getAccountById = async (id: string): Promise<Account | null > => {
  try{
      const result = await pool.query<Account>(
    `SELECT * FROM accounts WHERE id = $1`,
    [id]
  );
  return result.rows.length > 0 ? (result.rows[0] as Account) : null;

  }catch(err){
    console.log("getAccountById : " , err)
   return null;
  }

};
 
export const getAllAccounts = async (): Promise<Account[]> => {
const result = await pool.query<Account>(
  `select * FROM accounts ORDER BY  created_at DESC`
);
return result.rows;
}

export const deleteAccounts = async (): Promise<Account[]> => {
  await pool.query(`
    DELETE FROM transactions
  `);
  const result = await pool.query<Account>(`
    DELETE FROM accounts
    RETURNING *
  `);

  return result.rows;
};



export const deposite = async (data: AccountAmountDTO): Promise<Account | null> => {
  const account = await getAccountById(data.accountId);

  if (!account) throw new Error("Account not found");
  if (data.amount <= 0) throw new Error("Amount must be greater than zero");

  const result = await pool.query<Account>(
    `UPDATE accounts 
     SET balance = balance + $1 
     WHERE id = $2 
     RETURNING *`,
    [data.amount, data.accountId]
  );

  await pool.query(
    `INSERT INTO transactions (id, account_id, type, amount, created_at) 
     VALUES ($1, $2, $3, $4, NOW())`,
    [uuidv4(), data.accountId, "deposit", data.amount]
  );

  return result.rows[0] || null;
};

export const withdraw = async (data: AccountAmountDTO) : Promise<Account | null >  => {
  const account = await getAccountById(data.accountId);
  if (!account) throw new Error("Account not found");
  if (data.amount <= 0) throw new Error("Amount must be greater than zero");
  if (account.balance < data.amount) throw new Error("Insufficient funds");

  const result = await pool.query<Account>(
    `UPDATE accounts SET balance = balance - $1 WHERE id = $2 RETURNING *`,
    [data.amount, data.accountId]
  );

  await pool.query(
    `INSERT INTO transactions (id, account_id, type, amount, created_at) 
     VALUES ($1, $2, $3, $4, NOW())`,
    [uuidv4(), data.accountId, "withdraw", data.amount]
  );
  return result.rows[0] || null;
}

export const transfer = async (data: TransferDTO): Promise<void> => {
  const fromAccount = await getAccountById(data.fromAccountId);
  const toAccount = await getAccountById(data.toAccountId);

  if (!fromAccount) throw new Error("Sender account not found");
  if (!toAccount) throw new Error("Receiver account not found");
  if (data.amount <= 0) throw new Error("Amount must be greater than 0");
  if (fromAccount.balance < data.amount) throw new Error("Insufficient balance");

  await pool.query(
    `UPDATE accounts SET balance = balance - $1 WHERE id = $2`,
    [data.amount, data.fromAccountId]
  );

  await pool.query(
    `UPDATE accounts SET balance = balance + $1 WHERE id = $2`,
    [data.amount, data.toAccountId]  
  );

  await pool.query(
    `INSERT INTO transactions (id, account_id, type, amount, created_at)
     VALUES ($1, $2, $3, $4, NOW())`,
    [uuidv4(), data.fromAccountId, "transfer", data.amount] // ✅ added params
  );
};
	
export const getTransactions = async (accountId: string): Promise<Transaction[]> => {
		const result = await pool.query<Transaction>(
		`SELECT * FROM transactions WHERE account_id = $1  ORDER BY created_at DESC`,
		[accountId]
		);
		return result.rows;
	};
	
	