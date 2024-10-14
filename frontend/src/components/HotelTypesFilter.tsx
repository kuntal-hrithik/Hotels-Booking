import React from "react";

import { hotelTypes } from "@/config/hotel-options-config";

type Props = {
  selectdHotelTypes: string[];
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default function HotelTypesFilter({
  selectdHotelTypes,
  onChange,
}: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md mb-2 font-semibold">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label htmlFor="" className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectdHotelTypes.includes(type)}
            onChange={onChange}
            name=""
            id=""
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
}
