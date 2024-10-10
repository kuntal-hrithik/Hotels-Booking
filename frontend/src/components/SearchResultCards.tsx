import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";

import { HotelType } from "../../../Backend/src/shared/types";

type Props = {
  hotel: HotelType;
};
export default function SearchResultCards({ hotel }: Props) {
  return (
    <div className="grid grid-cols-1 gap-8 rounded-lg border border-slate-300 p-8 xl:grid-cols-[2fr_3fr] ">
      <div className="h-[300px] w-full">
        <img
          src={hotel.imageUrls[0]}
          className="size-full object-cover object-center"
          alt=""
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="item-center flex">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detai/${hotel._id}`}
            className="cursor-pointer text-2xl font-bold"
          >
            {hotel.name}
          </Link>
        </div>
        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grio-cols-2 item-end grid whitespace-nowrap">
          <div className="flex items-center gap-1">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="whitespace-nowrap rounded-lg bg-slate-300 p-2 text-xs font-bold">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="font-bold ">${hotel.pricePerNight} per night</span>
          <Link
            to={`/detail/${hotel._id}`}
            className="hover:bgblue500 h-full max-w-fit bg-blue-600 p-2 text-xl font-bold text-white"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}
