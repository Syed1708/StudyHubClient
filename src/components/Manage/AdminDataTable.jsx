import { Trash2, Eye, Check, X } from "lucide-react";

export default function AdminDataTable({
  columns,
  data,
  onDelete,
  onView,
  onApprove,
  onReject,
}) {
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
                {item.status === "pending" && (
                  <>
                    <button
                      onClick={() => onApprove?.(item)}
                      className="btn btn-xs btn-success"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => onReject?.(item)}
                      className="btn btn-xs btn-error"
                    >
                      <X size={14} />
                    </button>
                  </>
                )}
                <button
                  onClick={() => onView?.(item)}
                  className="btn btn-xs btn-info"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => onDelete?.(item)}
                  className="btn btn-xs btn-error"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
