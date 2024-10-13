import { json } from "stream/consumers";

import type {
  HotelSearchResponse,
  HotelType,
} from "../../Backend/src/shared/types";
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

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch("http://localhost:8000/api/my-hotels/get", {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }
  return response.json() as Promise<HotelType[]>;
};

export const fetchMyHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(
    `http://localhost:8000/api/my-hotels/get/${id}`,
    {
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch this hotel");
  }
  return response.json() as Promise<HotelType>;
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `http://localhost:8000/api/my-hotels/update/${hotelFormData.get("id")}`,
    {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    }
  );
  console.log(response.json());

  if (!response.ok) {
    throw new Error("Failed to update hotel");
  }
  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destinaiton", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );
  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  const response = await fetch(
    `http://localhost:8000/api/hotels/search?${queryParams}`
  );
  if (!response.ok) {
    throw new Error("Failed to search hotels");
  }
  return response.json() as Promise<HotelSearchResponse>;
};
