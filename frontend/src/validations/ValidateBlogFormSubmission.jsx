import toast from "react-hot-toast";
import DOMPurify from "dompurify"; // npm i dompurify

export const validateBlogForm = ({ title, description, contentHtml }) => {
  //  Title validation 
  if (!title.trim()) {
    toast.error("Title is required");
    return false;
  }
  if (title.trim().length < 5) {
    toast.error("Title must be at least 5 characters");
    return false;
  }
  if (!/^[A-Za-z0-9_ ]+$/.test(title.trim())) {
    toast.error("Title can only contain letters, numbers, spaces, and underscore (_)");
    return false;
  }

  // Description validation
  if (!description.trim()) {
    toast.error("Description is required");
    return false;
  }
  if (description.trim().length < 10) {
    toast.error("Description must be at least 10 characters");
    return false;
  }
  if (!/^[A-Za-z0-9_ ]+$/.test(description.trim())) {
    toast.error("Description can only contain letters, numbers, spaces, and underscore (_)");
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
