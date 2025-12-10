import React, { useState } from "react";
import TipTapEditor from "../../components/TipTapEditor/TipTapEditor";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import toast from "react-hot-toast";
import Spinner from "../../components/ui/Spinner"
import { useNavigate } from "react-router-dom"
import Breadcrumb from "../../components/ui/BreadCrumb";
import useAuth from "../../hooks/useAuth";

function BlogCreatePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleSubmit = async (blogContent) => {
    try {
      setLoading(true);
      const response = await userAuthenticateAxios.post(
        "/blog/create-blog/",
        blogContent
      );

      if (isAdmin) {
        navigate("/admin/dashboard/blogs");
      } else {
        navigate("/user/dashboard");
      }
      toast.success("Blog created!");
    } catch (error) {
      // console.error(error);
      toast.error("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  let breadcrumbItems = [];

  if (isAdmin) {
    breadcrumbItems = [
      { label: "Dashboard", link: "/admin/dashboard" },
      { label: "All Blogs", link: "/admin/dashboard/blogs" },
      { label: "Create Article" }
    ];
  } else {
    breadcrumbItems = [
      { label: "Home", link: "/" },
      { label: "My Blog Posts", link: "/user/dashboard" },
      { label: "Create Blog" }
    ];
  }


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