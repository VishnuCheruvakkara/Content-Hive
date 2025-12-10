// src/components/common/CustomToaster.jsx
import { Toaster } from "react-hot-toast";

function CustomToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,

        style: {
          background: "#1E293B",
          color: "#ffffff",
          fontSize: "15px",
          borderRadius: "10px",
          padding: "12px 16px",
          minWidth: "260px",
        },

    
      }}
    />
  );
}

export default CustomToaster;
