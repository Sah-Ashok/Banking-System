"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Account } from "@/types";

interface Props {
  accounts: Account[];
}

export default function TransferForm({ accounts }: Props) {
  const router = useRouter();
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (fromAccountId === toAccountId) {
      setError("Sender and receiver cannot be the same account");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/accounts/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromAccountId,
          toAccountId,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setSuccess("Transfer successful!");
      setAmount("");
      setFromAccountId("");
      setToAccountId("");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div>
        <label className="block text-gray-400 mb-2">From Account</label>
        <select
          value={fromAccountId}
          onChange={(e) => setFromAccountId(e.target.value)}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Select account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.owner} — ₹{parseFloat(account.balance).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-400 mb-2">To Account</label>
        <select
          value={toAccountId}
          onChange={(e) => setToAccountId(e.target.value)}
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="">Select account</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.owner} — ₹{parseFloat(account.balance).toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-gray-400 mb-2">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to transfer"
          required
          min="1"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Transferring..." : "Transfer"}
      </button>
    </form>
  );
}