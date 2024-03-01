import * as apiClinent from "@/api-client";
import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClinent.signIn, {
    onSuccess: async () => {
      showToast({ message: "LoggedIn Successfully", type: "success" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      showToast({ message: err.message, type: "error" });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form
      className="mx-auto flex max-w-screen-sm flex-col gap-5 "
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>

      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Email
        <input
          type="email"
          className="w-full  rounded border px-2 py-1 font-normal"
          {...register("email", { required: "this feild is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("password", {
            required: "this feild is required",
            minLength: {
              value: 6,
              message: "password must be atleast 6 chararcters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-lg"></span>
        <button
          type="submit"
          className="rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Sign In
        </button>
      </span>
    </form>
  );
}

export default SignIn;
