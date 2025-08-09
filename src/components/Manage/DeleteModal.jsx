// components/manage/DeleteConfirm.jsx
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function DeleteModal({ itemName = "item", onConfirm }) {
  return MySwal.fire({
    title: `Delete ${itemName}?`,
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
      Swal.fire("Deleted!", `${itemName} has been deleted.`, "success");
    }
  });
}
