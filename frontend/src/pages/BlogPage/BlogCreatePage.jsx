import React, { useState } from "react";
import TipTapEditor from "../../components/TipTapEditor/TipTapEditor";

function BlogCreatePage() {

  const handleSubmit = (jsonContent) => {
    console.log("Editor Content:", jsonContent);
    // send to backend later
  };

  return (
    <div className="p-4">
      <TipTapEditor onSubmit={handleSubmit} />
    </div>
  );
}

export default BlogCreatePage;