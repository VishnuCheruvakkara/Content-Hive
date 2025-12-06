import toast from "react-hot-toast";
import UserAuthenticatedAxios from "../../../axios/UserAuthenticateAxios";
import { validateImage } from "../../../validations/ImageValidation";

export const handleImageUpload = async (file, editor) => {
  const toastId = toast.loading("Uploading image...");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await UserAuthenticatedAxios.post("/blog/upload-image/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const imageUrl = response?.data?.data;
    toast.success("Image added", { id: toastId });

    editor.chain().focus().setImage({ src: imageUrl }).run();
  } catch (error) {
    console.error("Image upload failed:", error);
    toast.error("Failed to upload image", { id: toastId });
  }
};

export const triggerImageUpload = (editor) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!validateImage(file)) return;

    await handleImageUpload(file, editor);
  };

  input.click();
};
