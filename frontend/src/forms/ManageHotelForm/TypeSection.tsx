import { useFormContext } from "react-hook-form";

import { hotelTypes } from "@/config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Type</h2>
      <div className=" grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch == type
                ? " cursor-pointer rounded-full bg-blue-500 p-2 text-sm font-semibold "
                : "cursor-pointer rounded-full bg-gray-300 p-2 text-sm font-semibold"
            }
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-sm font-bold text-red-500">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}

export default TypeSection;
