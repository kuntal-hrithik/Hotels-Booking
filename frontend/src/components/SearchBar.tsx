import React, { FormEvent, useState } from "react";
import { useSearchContext } from "@/contexts/SearchContext";
import DatePicker from "react-datepicker";
import { MdTravelExplore } from "react-icons/md";

import "react-datepicker/dist/react-datepicker.css";

import { Navigate, useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 grid grid-cols-2 items-center gap-4 rounded bg-orange-400 p-3 shadow-md lg:grid-cols-5"
    >
      <div className="flex flex-1 flex-row items-center bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="where are you going"
          className="text-md w-full focus:outline-none "
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        ></input>
      </div>
      <div className="flex gap-2 bg-white px-2 py-1">
        <label htmlFor="" className="flex items-center">
          Adults:
          <input
            className="w-full p-1 font-bold focus:outline-none "
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(e) => setAdultCount(+e.target.value)}
          />
        </label>
        <label htmlFor="" className="flex items-center">
          Children:
          <input
            className="w-full p-1 font-bold focus:outline-none "
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(e) => setChildCount(+e.target.value)}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check in"
          className="mon-w-full bg-whiye p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="check in"
          className="mon-w-full bg-whiye p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button className="h-full w-2/3 bg-blue-600 p-2 text-xl font-bold text-white hover:bg-blue-500">
          Search
        </button>
        <button className="h-full w-1/3 bg-red-600 p-2 text-xl font-bold text-white hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
}
