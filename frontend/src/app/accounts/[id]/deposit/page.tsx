import DepositForm from "@/components/DepositForm";

export default async function DepositPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Deposit Money
      </h1>
      <DepositForm accountId={id} />
    </div>
  );
}