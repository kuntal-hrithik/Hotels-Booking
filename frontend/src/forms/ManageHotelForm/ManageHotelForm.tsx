import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { MdHotelClass } from "react-icons/md";

import { HotelType } from "../../../../Backend/src/shared/types";
import DetailSection from "./DetailSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSectuin";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};
type Props = {
  hotel?: HotelType;
  onSave: (hoteFormData: FormData) => void;
  isLoading: boolean;
};

function ManageHotelForm({ onSave, isLoading, hotel }: Props) {
  const formsMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formsMethods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((data: HotelFormData) => {
    console.log(data);
    const formData = new FormData();
    if (hotel) {
      formData.append("id", hotel._id);
    }
    console.log(formData);

    formData.append("name", data.name);
    formData.append("city", data.city);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childCount", data.childCount.toString());
    formData.append("pricePerNight", data.pricePerNight.toString());
    formData.append("starRating", data.starRating.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    console.log("hello");

    if (data.imageUrls) {
      data.imageUrls.forEach((imageUrl, index) => {
        formData.append(`imageUrls[${index}]`, imageUrl);
      });
    }

    Array.from(data.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });
    console.log(formData);
    console.log("ritik");

    onSave(formData);
  });
  return (
    <FormProvider {...formsMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-600 disabled:bg-gray-500 "
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
}

export default ManageHotelForm;
