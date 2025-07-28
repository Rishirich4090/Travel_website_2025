import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "info") => {
  toast(message, { type });
};

export const Toast = () => <ToastContainer position="top-right" autoClose={3000} hideProgressBar />;
