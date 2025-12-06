import toast from "react-hot-toast";
import DOMPurify from "dompurify"; // npm i dompurify

export const validateBlogForm = ({ title, description, contentHtml }) => {
  if (!title.trim()) {
    toast.error("Title is required");
    return false;
  }

  if (!description.trim()) {
    toast.error("Description is required");
    return false;
  }

  if (!contentHtml || contentHtml.trim() === "" || contentHtml.trim() === "<p></p>") {
    toast.error("Content cannot be empty");
    return false;
  }

  // Sanitize inputs
  const cleanTitle = sanitizeInput(title);
  const cleanDescription = sanitizeInput(description);
  const cleanContent = sanitizeHtml(contentHtml);

  if (!cleanTitle) {
    toast.error("Title cannot contain invalid characters");
    return false;
  }

  if (!cleanDescription) {
    toast.error("Description cannot contain invalid characters");
    return false;
  }

  return true;
};

// Sanitize plain text inputs
const sanitizeInput = (str) => {
  if (!str) return "";
  return str.replace(/<[^>]*>?/gm, "").trim(); // remove any HTML tags
};

// Sanitize HTML content
const sanitizeHtml = (html) => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true } // removes scripts, events, etc.
  });
};
