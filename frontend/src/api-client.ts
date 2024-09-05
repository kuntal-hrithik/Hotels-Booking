import type { RegisterFormData } from "./routes/Register";
import type { SignInFormData } from "./routes/SignIn";

type ResponseBody = {
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

console.log(API_BASE_URL);

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`http://localhost:8000/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = (await response.json()) as ResponseBody;
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = (await response.json()) as ResponseBody;
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch("http://localhost:8000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to sign out");
  }
};

export const validateToken = async () => {
  const response = await fetch(
    "http://localhost:8000/api/auth/validate-token",
    {
      credentials: "include",
    }
  );
  //console.log(await response.json());

  if (!response.ok) {
    throw new Error("Invalid token");
  }
  return response.json();
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch("http://localhost:8000/api/my-hotels/add", {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};
