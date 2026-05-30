import TransferForm from "@/components/TrasferForm";
import type { Account, ApiResponse } from "@/types";

async function getAllAccounts(): Promise<Account[]> {
  try {
    const res = await fetch("http://localhost:3001/api/accounts", {
      cache: "no-store",
    });
    const json: ApiResponse<Account[]> = await res.json();
    return json.data;
  } catch {
    return [];
  }
}

export default async function TransferPage() {
  const accounts = await getAllAccounts();

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-blue-400 mb-8">
        Transfer Money
      </h1>
      <TransferForm accounts={accounts} />
    </div>
  );
}