import { toast, ToastOptions } from "react-toastify";

interface Props {
  toastType: "loading" | "success" | "info" | "error" | "warning";
  toastMessage: string | undefined;
  options?: ToastOptions;
}

export function notify({ toastType, toastMessage, options }: Props) {
  const defaultToastOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const expandedOptions = { ...defaultToastOptions, ...options };

  switch (toastType) {
    case "loading":
      return toast.info(toastMessage, expandedOptions);
    case "success":
      return toast.success(toastMessage, expandedOptions);
    case "info":
      return toast.info(toastMessage, expandedOptions);
    case "error":
      return toast.error(toastMessage, expandedOptions);
    case "warning":
      return toast.warning(toastMessage, expandedOptions);
    default:
      return null;
  }

  return null;
}
