import React from "react";
import { MdSearch } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <div className="relative mb-6">

      {/* Search Icon */}
      <MdSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={22}
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-10 p-2 rounded bg-white/20 text-white
                   focus:outline-none focus:ring-2 focus:ring-brand-3"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                     hover:text-white transition cursor-pointer"
        >
          <IoClose size={20} />
        </button>
      )}
    </div>
  );
}
