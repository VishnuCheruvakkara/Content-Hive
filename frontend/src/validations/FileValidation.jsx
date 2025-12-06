import toast from "react-hot-toast";

export const validateFile = (file) => {
  const validTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    toast.error("Only PDF, DOC, DOCX files are allowed");
    return false;
  }
  if (file.size > maxSize) {
    toast.error("File size must be less than 10MB");
    return false;
  }
  return true;
};