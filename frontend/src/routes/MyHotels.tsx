import * as apiClient from "@/api-client";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function MyHotels() {
  const { data } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
  console.log(data);

  if (!data) return <span>No hotels found</span>;
  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 p-2 text-xl font-bold  text-white  hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {data.map((hotel) => (
          <div className="flex flex-col justify-between gap-5 rounded-lg border border-x-slate-300 p-8">
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex items-center rounded-sm border border-slate-300 p-3 ">
                <BsMap className="mr-1" />
                {hotel.city},{hotel.country}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3 ">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3 ">
                <BiMoney className="mr-1" />
                {hotel.pricePerNight} per night
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3 ">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="flex items-center rounded-sm border border-slate-300 p-3 ">
                <BiStar className="mr-1" />
                {hotel.starRating} star starRating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 p-2 text-xl font-bold  text-white  hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
