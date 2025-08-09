
import { useForm } from "react-hook-form";

export default function EditMaterialModal({ editing, onClose, onSubmit }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: editing.title,
      image: editing.image,
      link: editing.link,
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Update Material</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Image URL</label>
            <input
              {...register("image", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Google Drive Link</label>
            <input
              {...register("link", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
