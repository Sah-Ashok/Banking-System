"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountForm() {
  const router = useRouter();
  const [owner, setOwner] = useState("");
  const [initialBalance, setInitialBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner,
          initialBalance: parseFloat(initialBalance),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      router.push(`/accounts/${data.data.id}`);
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
        <label className="block text-gray-400 mb-2">Account Owner</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="Enter your name"
          required
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      <div>
        <label className="block text-gray-400 mb-2">Initial Balance (₹)</label>
        <input
          type="number"
          value={initialBalance}
          onChange={(e) => setInitialBalance(e.target.value)}
          placeholder="Enter initial balance"
          required
          min="0"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>
    </form>
  );
}