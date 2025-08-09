export default function SearchFilter({ search, setSearch, option, setOption }) {
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
        value={option}
        onChange={(e) => setOption(e.target.value)}
      >
        <option value="">All</option>
        <option value="1">Paid</option>
        <option value="0">Free</option>
      </select>
    </div>
  );
}
