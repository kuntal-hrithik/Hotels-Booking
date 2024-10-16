import React from "react";

type Props = {
  selectedStars: string[];
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
};

export default function starRatingFilter({ selectedStars, onChange }: Props) {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md mb-2 font-semibold">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label htmlFor="" className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
            name=""
            id=""
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
}
