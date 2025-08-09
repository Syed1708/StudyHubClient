
import useUserRole from "../../hooks/useUserRole";

export default function ManagePageLayout({ title, onCreate, children }) {
  const { role } = useUserRole();
  
  // console.log(role);
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {role === "tutor" &&  (
        <button onClick={onCreate} className="btn btn-sm btn-primary">
          + Create
        </button>
        )}


      </div>
      {children}
    </div>
  );
}
