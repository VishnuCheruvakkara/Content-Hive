import toast from "react-hot-toast";

export const validateImage = (file) => {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    toast.error("Only JPG, PNG, WEBP images are allowed");
    return false;
  }
  if (file.size > maxSize) {
    toast.error("Image size must be less than 5MB");
    return false;
  }
  return true;
};