
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const UploadMaterial = () => {
  const { sessionId } = useParams();
  
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const materialData = {
        ...data,
        sessionId,
        tutorEmail: user.email,
        
      };
      // console.log(materialData);
      
      const res = await axiosSecure.post("/meterials/upload", materialData);
      // console.log(res);
      
      if (res.data.insertedId) {
        toast.success("Material uploaded");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload material");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Upload Study Material</h2>

      <div>
        <label>Title</label>
        <input {...register("title", { required: true })} className="input input-bordered w-full" />
        {errors.title && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label>Google Drive Link</label>
        <input {...register("link", { required: true })} className="input input-bordered w-full" />
        {errors.link && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label>Image URL (ImgBB)</label>
        <input {...register("image", { required: true })} className="input input-bordered w-full" />
        {errors.image && <p className="text-red-500">Required</p>}
      </div>

      <div>
        <label>Tutor Email</label>
        <input value={user.email} readOnly className="input input-bordered w-full bg-gray-100" />
      </div>

      <div>
        <label>Study Session ID</label>
        <input value={sessionId} readOnly className="input input-bordered w-full bg-gray-100" />
      </div>

      <button className="btn btn-primary w-full">Upload</button>
    </form>
  );
};

export default UploadMaterial;
