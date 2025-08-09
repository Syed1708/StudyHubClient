import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export default function UploadMaterialModal({ session, onClose, refetch }) {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: session.title,
      link: session.link,
      image: session.image,
    },
  });

  const onSubmit = async (data) => {
    try {
      const materialData = {
        ...data,
        sessionId: session._id,
        tutorEmail: user.email,
      };

      const res = await axiosSecure.post("/meterials/upload", materialData);

      if (res.data.insertedId) {
        toast.success("Material uploaded");
        reset();
        refetch?.();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload material");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4">Upload Study Material</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Title</label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.title && <p className="text-red-500">Required</p>}
          </div>

          <div>
            <label className="label">Google Drive Link</label>
            <input
              {...register("link", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.link && <p className="text-red-500">Required</p>}
          </div>

          <div>
            <label className="label">Image URL (ImgBB)</label>
            <input
              {...register("image", { required: true })}
              className="input input-bordered w-full"
            />
            {errors.image && <p className="text-red-500">Required</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Tutor Email</label>
              <input
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            <div>
              <label className="label">Session ID</label>
              <input
                value={session._id}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-error"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
