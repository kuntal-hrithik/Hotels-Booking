import { useAppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import * as apiClient from "../api-client"; // Ensure that 'apiClient.ts' exists in the parent directory and it has the necessary exports.

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({ message: "Account created successfully", type: "success" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "error" });
    },
  });

  //signout thik karna hai 

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="mx-auto flex max-w-lg flex-col gap-5 " onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">create an account</h2>
      <div className="flex flex-col gap-2 md:flex-row ">
        <label htmlFor="" className="flex-1 text-sm font-bold text-gray-700 ">
          First Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("firstName", { required: "this feild is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label htmlFor="" className="flex-1 text-sm font-bold text-gray-700 ">
          Last Name
          <input
            type="text"
            className="w-full rounded border px-2 py-1 font-normal"
            {...register("lastName", { required: "this feild is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Email
        <input
          type="email"
          className="w-full rounded border px-2 py-1 font-normal"
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
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Confirm Password
        <input
          type="password"
          className="w-full rounded border px-2 py-1 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "this feild is required";
              } else if (watch("password") !== val) {
                return "passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="rounded bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500"
        >
          Create Account
        </button>
      </span>
    </form>
  );
}

export default Register;
