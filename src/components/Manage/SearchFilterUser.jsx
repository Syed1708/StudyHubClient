export default function SearchFilterUser({ search, setSearch, user, setUser }) {
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
        value={user}
        onChange={(e) => setUser(e.target.value)}
      >
        <option value="">All User</option>
        <option value="admin">Admin</option>
        <option value="tutor">Pending</option>
        <option value="student">Student</option>
      </select>
    </div>
  );
}
