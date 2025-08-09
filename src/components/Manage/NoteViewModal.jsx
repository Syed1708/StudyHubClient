
export default function NoteViewModal({ item, isOpen, onClose }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto shadow-lg">
        <h3 className="text-xl font-bold mb-2">{item.noteTitle}</h3>
        <div className="text-gray-800 whitespace-pre-wrap">
          {item.noteDescription}
        </div>
        <div className="text-right mt-4">
          <button className="btn btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
