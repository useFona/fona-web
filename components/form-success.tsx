import { RxCheckCircled } from "react-icons/rx";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <RxCheckCircled className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

