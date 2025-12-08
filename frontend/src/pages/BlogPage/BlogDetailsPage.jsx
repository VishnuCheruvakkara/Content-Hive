import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import FormattedDate from "../../components/ui/FormattedData";
import Button from "../../components/ui/Button";
import TipTapViewer from "../../components/TipTapEditor/TipTapViewer";
import Spinner from "../../components/ui/Spinner";
import Breadcrumb from "../../components/ui/BreadCrumb";
import { FiEdit, FiArrowLeft } from "react-icons/fi";
import NoDataFallback from "../../components/ui/NoDataFallback";
import { MdDelete } from "react-icons/md";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import toast
    from "react-hot-toast";
export default function BlogDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await userAuthenticateAxios.get(`/blog/get-single-blog/${id}/`);
            setBlog(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const breadcrumbItems = [
        { label: "Home", link: "/" },
        { label: "My Blog Posts", link: "/user/dashboard" },
        { label: "Blog details" },
    ];

    if (loading) return <Spinner />

    if (!blog && !loading) {
        return (
            <NoDataFallback
                message="No blog found."
                image="/no_search.svg"
                onBack={() => navigate(-1)}
            />
        );
    }

    const handleDelete = async () => {
        try {
            setLoading(true);
            await userAuthenticateAxios.patch(`/blog/delete-blog/${id}/`);
            toast.success("Blog deleted successfully");
            navigate("/user/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the blog");
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };


    return (

        <div className="p-6 relative">
            <Breadcrumb items={breadcrumbItems} />

            {/* Top Right Edit Button */}
            <div className="absolute right-6 top-6 flex space-x-4">
                <Button
                    icon={FiEdit}
                    className="px-4 py-2 rounded-sm"
                    onClick={() => navigate(`../edit-blog/${id}`)}
                >
                    Edit
                </Button>
                <Button
                    icon={MdDelete}
                    className="px-4 py-2 bg-brand-3 text-white rounded-sm"
                    onClick={() => setIsModalOpen(true)}
                >
                    Delete
                </Button>
            </div>


            {/* Published Date */}
            <div className="text-sm text-gray-400 mb-6">
                Published: <FormattedDate dateString={blog?.created_at} />
            </div>

            <div className="mb-6 bg-white/10 rounded-md p-3 overflow-x-hidden">
                <TipTapViewer content={blog?.content_html} />
            </div>

            {/* Back Button */}
            <div className="mt-6">
                <Button
                    icon={FiArrowLeft}
                    className="px-4 py-2 rounded-sm"
                    onClick={() => navigate("/users/dashboard")}
                >
                    Back to Blogs
                </Button>
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                title="Delete Blog"
                message="Are you sure you want to delete this blog? This action cannot be undone."
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
}
