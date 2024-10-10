import * as apiClient from "@/api-client";
import ManageHotelForm from "@/forms/ManageHotelForm/ManageHotelForm";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function EditHotel() {
  const { id } = useParams();
  const { data } = useQuery(
    ["fetchById", id],
    () => apiClient.fetchMyHotelById(id!),
    {
      enabled: !!id,
    }
  );
  
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      alert("Hotel updated successfully");
    },
    onError: (e) => {
      alert("hotel Saved Sucessfully");
      console.log(e);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    for (const value of hotelFormData.values()) {
      console.log(value);
    }
    console.log("hotel", hotelFormData);

    mutate(hotelFormData);
  };
  console.log(data);

  if (!data) return <span>No hotel found</span>;
  return (
    <ManageHotelForm onSave={handleSave} hotel={data} isLoading={isLoading} />
  );
}
