import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

export default function NoteEditModal({ isOpen, onClose, onSubmit, defaultValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues); 
    } else {
      reset({
        noteTitle: "",
        noteDescription: "",
        noteDuration: "",
      });
    }
  }, [defaultValues, reset]);

  const handleSave = (data) => {
    const payload = {
      ...data,
      studentName: user.displayName,
      studentEmail: user.email,
    };
    onSubmit(payload);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-[600px] max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">
          {defaultValues ? "Edit Note" : "Create Note"}
        </h2>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-3">
          {/* Note Title */}
          <div>
            <label className="block mb-1 font-medium">Note Title</label>
            <input
              className="input input-bordered w-full"
              placeholder="Enter note title"
              {...register("noteTitle", { required: true })}
            />
            {errors.noteTitle && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          {/* Note Description */}
          <div>
            <label className="block mb-1 font-medium">Note Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Enter note description"
              {...register("noteDescription", { required: true })}
            />
            {errors.noteDescription && (
              <span className="text-red-500">Required</span>
            )}
          </div>

          {/* student Name */}
          <div>
            <label className="block mb-1 font-medium">Student Name</label>
            <input
              className="input input-bordered w-full bg-gray-100 text-gray-700"
              value={user.displayName}
              readOnly
            />
          </div>

          {/* student Email */}
          <div>
            <label className="block mb-1 font-medium">Student Email</label>
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
