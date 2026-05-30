import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-green-400">
        💰 BankingSystem
      </Link>

      <div className="flex gap-6">
        <Link href="/dashboard" className="hover:text-green-400 transition">
          Dashboard
        </Link>
        <Link href="/accounts/create" className="hover:text-green-400 transition">
          New Account
        </Link>
        <Link href="/transfer" className="hover:text-green-400 transition">
          Transfer
        </Link>
        <Link
          href="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition text-sm font-semibold"
        >
          My Accounts
        </Link>
      </div>
    </nav>
  );
}