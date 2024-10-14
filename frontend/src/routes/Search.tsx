import { useState } from "react";
import * as apiClient from "@/api-client";
import { useSearchContext } from "@/contexts/SearchContext";
import { useQuery } from "react-query";

import FacilityTypesFilter from "@/components/FacilityTypesFilter";
import HotelTypesFilter from "@/components/HotelTypesFilter";
import Pagination from "@/components/Pagination";
import SearchResultCards from "@/components/SearchResultCards";
import StarRatingFilter from "../components/starRatingFilter";

export default function Search() {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedFacilityTypes, setSelectedFacilityTypes] = useState<string[]>(
    []
  );
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedType,
    facilities: selectedFacilityTypes,
  };
  const { data } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );
  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, starRating]
        : prev.filter((star) => star !== starRating)
    );
  };
  const handleHoteltypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedType((prev) =>
      event.target.checked
        ? [...prev, hotelType]
        : prev.filter((type) => type !== hotelType)
    );
  };
  const handleFacilityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facilityType = event.target.value;
    setSelectedFacilityTypes((prev) =>
      event.target.checked
        ? [...prev, facilityType]
        : prev.filter((type) => type !== facilityType)
    );
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[250px_1fr]">
      <div className="sticky top-10 h-fit rounded-lg border border-slate-300 p-5">
        <div className="space-y-5">
          <h3 className="border-b border-slate-300 text-lg font-semibold">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectdHotelTypes={selectedType}
            onChange={handleHoteltypeChange}
          />
          <FacilityTypesFilter
            selectedFacilityTypes={selectedFacilityTypes}
            onChange={handleFacilityTypeChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            {data?.pagination.total} Hotels Found
            {search.destination && ` in ${search.destination}`}
          </span>
        </div>
        {data?.data.map((hotel) => <SearchResultCards hotel={hotel} />)}
        <div>
          <Pagination
            page={data?.pagination.page || 1}
            pages={data?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
