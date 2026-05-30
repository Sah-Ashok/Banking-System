import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold text-green-400 mb-4">
        💰 Banking System
      </h1>
      <p className="text-gray-400 text-xl mb-8">
        Manage your accounts, deposits, withdrawals and transfers
      </p>

      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/accounts/create"
          className="border border-green-500 hover:bg-green-500 text-green-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}