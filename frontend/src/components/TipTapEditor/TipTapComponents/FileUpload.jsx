import toast from "react-hot-toast";
import UserAuthenticatedAxios from "../../../axios/UserAuthenticateAxios";
import { validateFile } from "../../../validations/FileValidation";

export const handleFileUpload = async (file, editor) => {
  const toastId = toast.loading("Uploading file...");
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await UserAuthenticatedAxios.post("/blog/upload-file/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const fileUrl = response?.data?.data;
    const fileName = fileUrl.split("/").pop();
    toast.success("File attached", { id: toastId });

    editor.chain().focus().insertContent(`
      <p class="file-box">
        <a href="${fileUrl}" target="_blank">${fileName}</a>
      </p>
    `).run();
  } catch (error) {
    console.error("File upload failed:", error);
    toast.error("Failed to upload file", { id: toastId });
  }
};


export const triggerFileUpload = (editor) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".pdf,.doc,.docx";

  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!validateFile(file)) return;

    await handleFileUpload(file, editor);
  };

  input.click();
};