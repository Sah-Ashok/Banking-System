import Link from "next/link";
import type { Account, ApiResponse } from "@/types";

async function getAccounts(): Promise<Account[]> {
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

export default async function DashboardPage() {
  const accounts = await getAccounts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-green-400">Dashboard</h1>
        <Link
          href="/accounts/create"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          + New Account
        </Link>
      </div>

      {accounts.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-xl">No accounts found</p>
          <p className="mt-2">Create your first account to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <Link href={`/accounts/${account.id}`} key={account.id}>
              <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{account.owner}</h2>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
                <p className="text-3xl font-bold text-green-400">
                  ₹{parseFloat(account.balance).toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Created: {new Date(account.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}