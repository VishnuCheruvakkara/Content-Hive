import React from "react";
import { PiSpinnerGap } from "react-icons/pi";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full py-10 bg-brand-1/10">
      {/* Spinner Icon */}
      <PiSpinnerGap className="animate-spin text-brand-4" size={48} />
    </div>
  );
};

export default Spinner;
