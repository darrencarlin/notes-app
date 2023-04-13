import { toast } from "react-toastify";

export const callToast = (note: string) =>
  toast(note, {
    position: "bottom-right",
    autoClose: 5000,
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