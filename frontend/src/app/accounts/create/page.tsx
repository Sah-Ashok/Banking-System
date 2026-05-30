import CreateAccountForm from "@/components/CreateAccountForm";

export default function CreateAccountPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-green-400 mb-8">
        Create New Account
      </h1>
      <CreateAccountForm />
    </div>
  );
}