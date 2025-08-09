import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';

export default function ReviewSection({ sessionId }) {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // console.log(user.displayName, "email", user.email);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${sessionId}`);
      return res.data;
    },
  });

  const hasReviewed = reviews.some((r) => r.studentEmail === user?.email);

  const reviewMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        sessionId,
        studentName: user.displayName,
        studentEmail: user.email,
        review: data.review,
        rating: parseInt(data.rating),
        createdAt: new Date(),
      };
      return axiosSecure.post(`/reviews`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', sessionId]);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (!hasReviewed) {
      reviewMutation.mutate(data);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-bold mb-4">📝 Your Review</h3>

      {!hasReviewed ? (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 p-4 rounded-md shadow space-y-3">
          <div>
            <textarea
              {...register('review', { required: 'Review is required', minLength: 5 })}
              rows={4}
              className="textarea textarea-bordered w-full"
              placeholder="Write your feedback..."
            />
            {errors.review && <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>}
          </div>

          <div className="flex items-center gap-3">
            <label className="font-medium">Rating:</label>
            <select
              {...register('rating', { required: true })}
              className="select select-sm select-bordered"
              defaultValue={5}
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
              ))}
            </select>
            <button
              type="submit"
              className="btn btn-sm btn-primary ml-auto"
            >
              Submit Review
            </button>
          </div>
        </form>
      ) : (
        <p className="text-green-600">✅ You have already submitted a review for this session.</p>
      )}



      {/* Existing Reviews */}
      {reviews.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">🌟 Student Reviews</h4>
          <ul className="space-y-4">
            {reviews.map((rev) => (
              <li key={rev._id} className="bg-white p-4 rounded shadow border">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-medium">{rev.studentName}</p>
                  <span className="text-yellow-500">{'★'.repeat(rev.rating)}</span>
                </div>
                <p className="text-gray-700">{rev.review}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
