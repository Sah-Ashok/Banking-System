import type { Account, Transaction, ApiResponse } from "@/types";
import AccountDetail from "@/components/AccountDetail";

async function getAccount(id: string): Promise<Account | null> {
  try {
    const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
      cache: "no-store",
    });
    const json: ApiResponse<Account> = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

async function getTransactions(id: string): Promise<Transaction[]> {
  try {
    const res = await fetch(
      `http://localhost:3001/api/accounts/${id}/transactions`,
      { cache: "no-store" }
    );
    const json: ApiResponse<Transaction[]> = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export default async function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const account = await getAccount(id);
  const transactions = await getTransactions(id);

  return <AccountDetail account={account} transactions={transactions} />;
}