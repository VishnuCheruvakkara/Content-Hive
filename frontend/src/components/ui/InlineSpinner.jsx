import React from "react";
import { ImSpinner3 } from "react-icons/im";
export default function InlineSpinner({ size = 40 }) {
  return (
    <div className="w-full flex items-center justify-center ">
      <ImSpinner3
        className="animate-spin text-brand-4 "
        size={size}
      />
    </div>
  );
}
