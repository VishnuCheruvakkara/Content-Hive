import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  if (!items.length) return null;

  return (
    <nav className="text-sm text-gray-400 mb-2" aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          {item.link ? (
            <Link
              to={item.link}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="mx-1">/</span>
          )}
        </span>
      ))}
    </nav>
  );
}
