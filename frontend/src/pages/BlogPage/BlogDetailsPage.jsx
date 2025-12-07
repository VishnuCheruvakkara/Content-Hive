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

export default function BlogDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

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

    return (

        <div className="p-6 relative">
            <Breadcrumb items={breadcrumbItems} />

            {/* Top Right Edit Button */}
            <div className="absolute right-6 top-6">
                <Button
                    icon={FiEdit}
                    className="px-4 py-2 rounded-sm"
                    onClick={() => navigate(`../edit-blog/${id}`)}
                >
                    Edit
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
        </div>
    );
}
