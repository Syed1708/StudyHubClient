import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const CreateSession = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const sessionData = {
      ...data,
      tutorName: user.displayName,
      tutorEmail: user.email,
    };

    try {
      const res = await axiosSecure.post("/sessions/create", sessionData);
      if (res.data.insertedId) {
        toast.success("Session created and sent for approval");
        reset();
      }
    } catch (err) {
      toast.error("Failed to create session");
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Study Session</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <label className="block mb-1 font-medium">Session Description</label>
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

        {/* Registration Fee */}
        <div>
          <label className="block mb-1 font-medium">Registration Fee</label>
          <input
            className="input input-bordered w-full bg-gray-100 text-gray-700"
            value={0}
            readOnly
          />
        </div>

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default CreateSession;
