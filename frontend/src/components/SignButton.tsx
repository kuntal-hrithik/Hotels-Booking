import * as apiClient from "@/api-client";
import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

function SignButton() {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged Out Successfully", type: "success" });
      navigate("/login");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "error" });
    },
  });
  const handleClick = handleSubmit(() => {
    mutation.mutate();
  });
  return (
    <button
      onClick={handleClick}
      className="bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}

export default SignButton;
