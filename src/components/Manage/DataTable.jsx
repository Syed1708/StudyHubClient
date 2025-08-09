import { Pencil, Trash2, Eye } from "lucide-react";

export default function DataTable({ columns, data, onEdit, onDelete, onView }) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}

              <td className="space-x-1">

               <>
                      <button onClick={() => onEdit(item)} className="btn btn-xs btn-warning"><Pencil size={14} /></button>
                      <button onClick={() => onView(item)} className="btn btn-xs btn-info"><Eye size={14} /></button>
                      <button onClick={() => onDelete(item)} className="btn btn-xs btn-error"><Trash2 size={14} /></button>
                    </>
                
              </td>

            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
}
