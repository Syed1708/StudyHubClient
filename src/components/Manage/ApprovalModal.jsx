import { useForm } from "react-hook-form";

export default function ApprovalModal({ isOpen, onClose, onSubmit, item }) {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      registrationFee: item?.registrationFee || 0,
    },
  });

  const registrationFee = watch("registrationFee");

  const handleApprove = (data) => {
    const fee = parseFloat(data.registrationFee);
    const payload = {
      registrationFee: fee,
      isPaid: fee > 0,
      status: "approved",
    };

    onSubmit(payload);
    onClose();
    reset();
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px]">
        <h2 className="text-lg font-bold mb-4">Approve Session</h2>
        <p className="mb-2">
          Approving session: <strong>{item.sessionTitle}</strong>
        </p>

        <form onSubmit={handleSubmit(handleApprove)} className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Registration Fee (0 for free)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              className="input input-bordered w-full"
              {...register("registrationFee", { required: true })}
            />
          </div>

          <div className="text-sm text-gray-600">
            This session will be:{" "}
            <span className={`font-bold ${registrationFee > 0 ? "text-green-600" : "text-blue-600"}`}>
              {registrationFee > 0 ? "PAID" : "FREE"}
            </span>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-success">
              Approve
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
