import React from "react";
import { FiMapPin, FiCalendar, FiUser, FiSearch } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getPublicColorTheme } from '../redux/slice/publicApiSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const SearchBar = ({ placeholder = "Where are you going?", onSearch, dateLabel = "Add date, Add time" , toLabel = "Drop-off", fromLabel = "Pick-up", searchBtn = "Search" }) => {
  const theme = useSelector((state) => state.publicApi.colorTheme);
  const dispatch = useDispatch();
    const router = useRouter();

  useEffect(() => {
      dispatch(getPublicColorTheme());
    }, [dispatch]);
  
  return (
    <div
  style={{
    backgroundColor: theme?.backgroundColor || "#fff",
    borderColor: theme?.borderColor || "#e5e7eb"
  }}
  className="rounded-2xl md:rounded-full shadow-md px-4 py-3 border w-full mx-4 sm:mx-auto sm:max-w-6xl"
>
  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 w-full">
    
    {/* Location */}
    <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:border-r md:pr-3">
      <FiMapPin className="text-gray-500 flex-shrink-0" />
      <div className="w-full">
        <p className="text-xs text-gray-500 uppercase">{fromLabel}</p>
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400 w-full"
        />
      </div>
    </div>

    {/* Check-in */}
    <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:border-r md:pr-3">
      <FiCalendar className="text-gray-500 flex-shrink-0" />
      <div className="w-full">
        <p className="text-xs text-gray-500 uppercase">{dateLabel}</p>
        <input
          type="date"
          className="bg-transparent text-sm outline-none text-gray-800 w-full"
        />
      </div>
    </div>

    {/* Check-out */}
    <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:border-r md:pr-3">
      <FiCalendar className="text-gray-500 flex-shrink-0" />
      <div className="w-full">
        <p className="text-xs text-gray-500 uppercase">{toLabel}</p>
        <input
          type="date"
          className="bg-transparent text-sm outline-none text-gray-800 w-full"
        />
      </div>
    </div>

   

    {/* Search Button */}
    <div className="w-full md:w-auto">
      <button
        onClick={onSearch}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl md:rounded-full hover:bg-blue-700 transition w-full md:w-auto"
      >
        <FiSearch />
        <span>{searchBtn}</span>
      </button>
    </div>
  </div>
</div>

  );
};

export default SearchBar;