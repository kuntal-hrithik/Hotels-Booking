import { useEffect } from "react";

type toastProps = {
  message: string;
  type: "error" | "success";
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: toastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  const styles =
    type === "success"
      ? "fixed top-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md "
      : "fixed top-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md ";
  return (
    <div className={styles}>
      <div className="flex items-center justify-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
