"use client";

import Link from "next/link";
import type { Account, Transaction } from "@/types";

interface Props {
  account: Account | null;
  transactions: Transaction[];
}

export default function AccountDetail({ account, transactions }: Props) {
  if (!account) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl text-red-400">Account not found</h1>
        <Link href="/dashboard" className="text-green-400 mt-4 block">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Account Info */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{account.owner}</h1>
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white transition"
          >
            ← Back
          </Link>
        </div>
        <p className="text-5xl font-bold text-green-400 mb-2">
          ₹{parseFloat(account.balance).toLocaleString()}
        </p>
        <p className="text-gray-400 text-sm">
          Account ID: {account.id}
        </p>
        <p className="text-gray-400 text-sm">
          Created: {new Date(account.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Link
          href={`/accounts/${account.id}/deposit`}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          + Deposit
        </Link>
        <Link
          href={`/accounts/${account.id}/withdraw`}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          - Withdraw
        </Link>
        <Link
          href="/transfer"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          ⇄ Transfer
        </Link>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Transaction History</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {transaction.type === "deposit"
                      ? "↑"
                      : transaction.type === "withdraw"
                      ? "↓"
                      : "⇄"}
                  </span>
                  <div>
                    <p className="font-semibold capitalize">
                      {transaction.type}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(transaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-xl font-bold ${
                    transaction.type === "deposit"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {transaction.type === "deposit" ? "+" : "-"}₹
                  {parseFloat(transaction.amount).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}