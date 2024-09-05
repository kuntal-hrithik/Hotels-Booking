import { useFormContext } from "react-hook-form";

import { hotelFacilities } from "@/config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

function FacilitiesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="mb-3 text-2xl font-bold">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="flex  gap-1 text-sm text-gray-700">
            <input
              type="checkbox"
              className=""
              value={facility}
              {...register("facilities")}
            />
            <span className=" ml-2 ">{facility}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default FacilitiesSection;
