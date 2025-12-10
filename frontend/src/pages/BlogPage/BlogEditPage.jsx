import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import TipTapEditor from "../../components/TipTapEditor/TipTapEditor";
import Spinner from "../../components/ui/Spinner";
import Breadcrumb from "../../components/ui/BreadCrumb";
import toast from "react-hot-toast";

export default function BlogEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "user";

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    // Fetch blog details to pre-fill the form
    const fetchBlog = async () => {
        try {
            const response = await userAuthenticateAxios.get(`/blog/get-single-blog/${id}/`);
            setBlog(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch blog details");
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    // Handle Update Submit
    const handleUpdate = async (updatedData) => {
        try {
            setLoading(true);

            const response = await userAuthenticateAxios.patch(
                `/blog/update-blog/${id}/`,
                updatedData
            );

            toast.success("Blog updated successfully");
            navigate(`../blog-details/${id}`);
        } catch (error) {
            toast.error("Failed to update blog");
            // console.error(error);
        } finally {
            setLoading(false);
        }
    };


    let breadcrumbItems;

    if (from === "admin") {
        breadcrumbItems = [
            { label: "Dashboard", link: "/admin/dashboard" },
            { label: "All Blogs", link: "/admin/dashboard/blog-details/{id:}" },
            { label: "Blog Details", link: `/admin/dashboard/blog-details/${id}` },
            { label: "Edit Blog" },
        ];
    } else {
        breadcrumbItems = [
            { label: "Home", link: "/" },
            { label: "My Blog Posts", link: "/user/dashboard" },
            { label: "Edit Blog" },
        ];
    }

    if (loading) return <Spinner />;

    return (
        <div className="p-4">
            <Breadcrumb items={breadcrumbItems} />

            <TipTapEditor
                onSubmit={handleUpdate}
                defaultTitle={blog?.title}
                defaultDescription={blog?.description}
                defaultContent={blog?.content_html}
                isEdit={true}
            />
        </div>
    );
}
