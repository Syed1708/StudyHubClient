import { format } from "date-fns";

export default function ViewModal({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  const formatDate = (dateStr) =>
    dateStr ? format(new Date(dateStr), "PPP") : "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded-box w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
        <h3 className="text-2xl font-bold text-primary mb-2">
          {item.sessionTitle}
        </h3>

        <section className="mb-4">
          <h4 className="text-lg font-medium text-base-content mb-1">Duration</h4>
          <p className="text-base-content">{item.sessionDuration}</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-medium text-base-content mb-1">Description</h4>
          <p className="text-base-content">{item.sessionDescription}</p>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-medium text-base-content mb-1">Tutor Info</h4>
          <p><strong>Name:</strong> {item.tutorName}</p>
          <p><strong>Email:</strong> {item.tutorEmail}</p>
        </section>

        <section className="mb-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-semibold text-base-content">Registration Start</h5>
            <p>{formatDate(item.registrationStartDate)}</p>
          </div>
          <div>
            <h5 className="font-semibold text-base-content">Registration End</h5>
            <p>{formatDate(item.registrationEndDate)}</p>
          </div>
          <div>
            <h5 className="font-semibold text-base-content">Class Start</h5>
            <p>{formatDate(item.classStartDate)}</p>
          </div>
          <div>
            <h5 className="font-semibold text-base-content">Class End</h5>
            <p>{formatDate(item.classEndDate)}</p>
          </div>
        </section>

        <section className="mb-4">
          <h4 className="text-lg font-medium text-base-content mb-1">Details</h4>
          <p><strong>Fee:</strong> ${item.registrationFee}</p>
          <p><strong>Status:</strong> {item.status}</p>
          <p><strong>Paid:</strong> {item.isPaid ? "Yes" : "No"}</p>
          <p><strong>Created:</strong> {formatDate(item.createdAt)}</p>
        </section>

        <div className="text-right">
          <button
            onClick={onClose}
            className="btn btn-sm btn-primary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
