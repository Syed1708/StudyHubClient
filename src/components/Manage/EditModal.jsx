import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

export default function EditModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const toInputDate = (iso) => {
    if (!iso) return "";
    const date = new Date(iso);
    return date.toISOString().split("T")[0]; // returns "YYYY-MM-DD"
  };

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        registrationStartDate: toInputDate(defaultValues.registrationStartDate),
        registrationEndDate: toInputDate(defaultValues.registrationEndDate),
        classStartDate: toInputDate(defaultValues.classStartDate),
        classEndDate: toInputDate(defaultValues.classEndDate),
      });
    } else {
      reset({
        sessionTitle: "",
        sessionDuration: "",
        sessionDescription: "",
        registrationStartDate: "",
        registrationEndDate: "",
        classStartDate: "",
        classEndDate: "",
      });
    }
  }, [defaultValues, reset]);

  const handleSave = (data) => {
    const payload = {
      ...data,
      registrationStartDate: new Date(data.registrationStartDate).toISOString(),
      registrationEndDate: new Date(data.registrationEndDate).toISOString(),
      classStartDate: new Date(data.classStartDate).toISOString(),
      classEndDate: new Date(data.classEndDate).toISOString(),
      tutorName: user.displayName,
      tutorEmail: user.email,
    };
    onSubmit(payload);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-base-100 p-6 rounded shadow-md w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {defaultValues ? "Edit Session" : "Create Session"}
        </h2>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-3">
          {/* Session Title */}
          <div>
            <label className="block mb-1 font-medium">Session Title</label>
            <input
              className="input input-bordered w-full"
              placeholder="Enter session title"
              {...register("sessionTitle", { required: true })}
            />
            {errors.sessionTitle && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          {/* Session Description */}
          <div>
            <label className="block mb-1 font-medium">
              Session Description
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter session description"
              {...register("sessionDescription", { required: true })}
            />
            {errors.sessionDescription && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          {/* Registration Start Date */}
          <div>
            <label className="block mb-1 font-medium">
              Registration Start Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("registrationStartDate", {
                required: true,
                validate: (value) =>
                  new Date(value) > new Date() || "Date must be in the future",
              })}
            />

            {errors.registrationStartDate && (
              <span className="text-red-500">
                {errors.registrationStartDate.message}
              </span>
            )}
          </div>

          {/* Registration End Date */}
          <div>
            <label className="block mb-1 font-medium">
              Registration End Date
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("registrationEndDate", {
                required: true,
                validate: (value) =>
                  new Date(value) > new Date() || "Date must be in the future",
              })}
            />
            {errors.registrationEndDate && (
              <span className="text-red-500">
                {errors.registrationEndDate.message}
              </span>
            )}
          </div>

          {/* Class Start Date */}
          <div>
            <label className="block mb-1 font-medium">Class Start Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("classStartDate", {
                required: true,
                validate: (value) =>
                  new Date(value) > new Date() || "Date must be in the future",
              })}
            />
            {errors.classStartDate && (
              <span className="text-red-500">
                {errors.classStartDate.message}
              </span>
            )}
          </div>

          {/* Class End Date */}
          <div>
            <label className="block mb-1 font-medium">Class End Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("classEndDate", {
                required: true,
                validate: (value) =>
                  new Date(value) > new Date() || "Date must be in the future",
              })}
            />
            {errors.classEndDate && (
              <span className="text-red-500">
                {errors.classEndDate.message}
              </span>
            )}
          </div>

          {/* Session Duration */}
          <div>
            <label className="block mb-1 font-medium">Session Duration</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. 1 Month, 6 Weeks"
              {...register("sessionDuration", { required: true })}
            />
          </div>

          {/* Tutor Name */}
          <div>
            <label className="block mb-1 font-medium">Tutor Name</label>
            <input
              className="input input-bordered w-full bg-gray-100 text-gray-700"
              value={user.displayName}
              readOnly
            />
          </div>

          {/* Tutor Email */}
          <div>
            <label className="block mb-1 font-medium">Tutor Email</label>
            <input
              className="input input-bordered w-full bg-gray-100 text-gray-700"
              value={user.email}
              readOnly
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
