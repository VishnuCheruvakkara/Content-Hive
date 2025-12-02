import React from "react";
import { PiSpinnerGap } from "react-icons/pi";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-1/90 backdrop-blur-sm z-[9999]">
      <PiSpinnerGap className="animate-spin text-brand-4" size={70} />
    </div>
  );
};

export default Spinner;
