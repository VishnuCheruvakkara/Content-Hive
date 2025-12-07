import React from "react";
import { ImSpinner3 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-brand-1/90 backdrop-blur-sm z-9999">
      <ImSpinner3 className="animate-spin text-brand-4" size={70} />
    </div>
  );
};

export default Spinner;
