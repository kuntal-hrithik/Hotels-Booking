import { useFormContext } from "react-hook-form";

import type { HotelFormData } from "./ManageHotelForm";

function DetailSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className=" flex  flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Name
        <input
          type="text"
          className="w-full  rounded border px-2 py-1 font-normal"
          {...register("name", { required: "this feild is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4 ">
        <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
          city
          <input
            type="text"
            className="w-full  rounded border px-2 py-1 font-normal"
            {...register("city", { required: "this feild is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city?.message}</span>
          )}
        </label>
        <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
          Country
          <input
            type="text"
            className="w-full  rounded border px-2 py-1 font-normal"
            {...register("country", { required: "this feild is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country?.message}</span>
          )}
        </label>
      </div>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        Description
        <textarea
          rows={10}
          className="w-full  rounded border px-2 py-1 font-normal"
          {...register("description", { required: "this feild is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description?.message}</span>
        )}
      </label>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        PricePerNight
        <input
          type="number"
          className="w-full  rounded border px-2 py-1 font-normal"
          {...register("pricePerNight", { required: "this feild is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight?.message}</span>
        )}
      </label>
      <label htmlFor="" className=" text-sm font-bold text-gray-700 ">
        StarRating
        <select
          {...register("starRating", {
            required: "this feild is required",
          })}
          className="w-full rounded border py-1 font-normal text-gray-700"
        >
          <option value="" className="text-sm font-bold">
            Select a star rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option value={rating}>{rating}</option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating?.message}</span>
        )}
      </label>
    </div>
  );
}

export default DetailSection;
