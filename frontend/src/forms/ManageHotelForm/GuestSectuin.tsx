import { useFormContext } from "react-hook-form";

import type { HotelFormData } from "./ManageHotelForm";

function GuestSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Guset Section</h2>
      <div className="grid grid-cols-2 gap-5 bg-gray-300 p-6">
        <label htmlFor="" className="text-sm font-semibold text-gray-700 ">
          Adults
          <input
            type="number"
            min={1}
            className="w-full rounded border px-3 py-2 font-normal"
            {...register("adultCount", { required: "this feild is required" })}
          />
          {errors.adultCount && errors.adultCount.message && (
            <p className="mt-2 text-red-500">{errors.adultCount.message}</p>
          )}
        </label>

        <label htmlFor="" className="text-sm font-semibold text-gray-700 ">
          Children
          <input
            type="number"
            min={0}
            className="w-full rounded border px-3 py-2 font-normal"
            {...register("childCount", { required: "this feild is required" })}
          />
        </label>
        {errors.childCount && errors.childCount.message && (
          <p className="mt-2 text-red-500">{errors.childCount.message}</p>
        )}
      </div>
    </div>
  );
}

export default GuestSection;
