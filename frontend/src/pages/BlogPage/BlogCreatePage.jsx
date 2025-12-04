import React, { useState } from "react";
import SimpleEditor from "../components/SimpleEditor";

export default function BlogCreatePage() {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("Editor Content:", content);
    // send to backend later
  };

  return (
    <div className="p-4">
      <SimpleEditor onChange={setContent} />
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Save Post
      </button>
    </div>
  );
}
