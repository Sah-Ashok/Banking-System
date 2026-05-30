"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  accountId: string;
}

export default function DepositForm({ accountId }: Props) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/accounts/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      router.push(`/accounts/${accountId}`);
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

      <div>
        <label className="block text-gray-400 mb-2">Amount (₹)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount to deposit"
          required
          min="1"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Depositing..." : "Deposit"}
        </button>
        <Link
          href={`/accounts/${accountId}`}
          className="flex-1 text-center border border-gray-600 hover:border-gray-400 text-gray-400 hover:text-white py-3 rounded-lg font-semibold transition"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}