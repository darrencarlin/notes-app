import { toast } from "react-toastify";

export const callToast = (
  note: string,
  type: "warning" | "success",
  time: number = 5000
): void => {
  toast(note, {
    type,
    position: "bottom-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    style: {
      background: "rgb(55 65 81)",
      color: "#fff",
    },
  });
};
