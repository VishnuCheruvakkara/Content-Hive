import React, { useState } from "react";
import TipTapEditor from "../../components/TipTapEditor/TipTapEditor";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../../components/ui/BreadCrumb";

function BlogCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (blogContent) => {
    try {
      setLoading(true);
      const response = await userAuthenticateAxios.post(
        "/blog/create-blog/",
        blogContent
      );

      console.log("Blog saved:", response.data);
      navigate("/user/dashboard")
      toast.success("Blog created!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "My Blog Posts", link: "/user/dashboard" },
    { label: "Create Blog" },
  ];

  return (
    <>
      {loading && <Spinner />}


      <div className="p-4">
        <Breadcrumb items={breadcrumbItems} />
        <TipTapEditor onSubmit={handleSubmit} />
      </div>
    </>
  );
}

export default BlogCreatePage;