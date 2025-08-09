export default function SearchFilterBar({ search, setSearch, status, setStatus }) {
  return (
    <div className="flex justify-between items-center mb-4 gap-4">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="select select-bordered"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}
