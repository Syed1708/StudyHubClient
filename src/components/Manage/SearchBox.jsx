import useUserRole from "../../hooks/useUserRole";

export default function SearchBox({ search, setSearch, onCreate }) {
  const { role } = useUserRole();
  return (
    <div className="flex justify-between items-center mb-4 gap-4">
      <input
        type="text"
        className="input input-bordered w-full max-w-xs"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

        {role === "student" &&  (
        <button onClick={onCreate} className="btn btn-sm btn-primary">
          + Create
        </button>
        )}
    </div>
  );
}
