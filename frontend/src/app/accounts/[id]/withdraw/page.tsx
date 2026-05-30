import WithdrawForm from "@/components/WithdrawForm";

export default async function WithdrawPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-red-400 mb-8">
        Withdraw Money
      </h1>
      <WithdrawForm accountId={id} />
    </div>
  );
}