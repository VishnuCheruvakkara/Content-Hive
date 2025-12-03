import React, { useState } from "react";
import TipTapEditor from "../../components/TipTapEditor/TipTapEditor";

function BlogCreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/posts/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    console.log("Post Created:", data);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem" }}>
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: "1rem", padding: "8px" }}
        />

        <TipTapEditor value={content} onChange={setContent} />

        <button type="submit" style={{ marginTop: "1rem" }}>
          Publish
        </button>
      </form>
    </div>
  );
}

export default BlogCreatePage;
