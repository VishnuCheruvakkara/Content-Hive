import React from "react";

export default function FormattedDate({ dateString }) {
  if (!dateString) return <span>Unknown</span>;

  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-IN"); // dd/mm/yyyy
  const formattedTime = date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return <span className="text-xs">{`${formattedDate} at ${formattedTime}`}</span>;
}
