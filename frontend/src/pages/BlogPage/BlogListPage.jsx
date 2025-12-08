import React, { useState, useEffect } from "react";
import InlineSpinner from "../../components/ui/InlineSpinner";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import FormattedDate from "../../components/ui/FormattedData";
import NoDataFallback from "../../components/ui/NoDataFallback";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/ui/BreadCrumb";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import useAuth from "../../hooks/useAuth";
import { MdAssignmentAdd } from "react-icons/md";
import Button from "../../components/ui/Button";

export default function BlogListPage({
    apiEndpoint,
    title,
    breadcrumbItems,
    showCreateButton = false,
    detailPath = "/user/blog-details",
}) {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const debouncedSearch = useDebounce(search, 800);

    const fetchBlogs = async (pageNumber = 1) => {
        try {
            setLoading(true);

            const response = await userAuthenticateAxios.get(apiEndpoint, {
                params: { page: pageNumber, q: debouncedSearch },
            });

            console.log("Blog Lists :", response?.data?.results)

            setBlogs(response?.data?.results || []);
            setPage(pageNumber);

            const count = response?.data?.count || 0;
            setTotalPages(Math.ceil(count / 5));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(1);
    }, [debouncedSearch]);

    return (
        <div className="p-4">
            <Breadcrumb items={breadcrumbItems} />

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">{title}</h1>

                {showCreateButton && (
                    <Button
                        icon={MdAssignmentAdd}
                        className="bg-brand-3 px-4 py-2 rounded text-white"
                        onClick={() => navigate("create-article")}
                    >
                        Create Article
                    </Button>
                )}
            </div>

            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search blogs..."
            />

            {loading ? (
                <InlineSpinner size={45} />
            ) : blogs.length === 0 ? (
                <NoDataFallback message="No blogs found." image="/no_search.svg" />
            ) : (
                blogs.map((blog) => (

                    <div
                        key={blog.id}
                        className="mb-6 p-4 bg-gray-900/50 rounded cursor-pointer"

                    >
                        {/* User Info Section */}
                        <div className="flex items-center mb-3" onClick={() =>
                            navigate(`${detailPath}/${blog.id}`, {
                                state: { from: title === "Explore Posts" ? "explore" : "my-posts" }
                            })
                        }
                        >
                            {/* Left Circular Icon with First Letter */}
                            <div className="w-10 h-10 bg-brand-3 text-white flex items-center justify-center rounded-lg text-lg font-bold">
                                {blog?.created_by?.username?.charAt(0)?.toUpperCase()}
                            </div>

                            {/* Username + date */}
                            <div className="ml-3">
                                <p className="text-white font-semibold text-sm">
                                    {blog?.created_by?.username || "Unknown User"}{" "}
                                    {user?.id === blog?.created_by?.id && (
                                        <span className="text-brand-3 font-bold">(You)</span>
                                    )}
                                </p>

                                <p className="text-gray-400 text-xs">
                                    <FormattedDate dateString={blog.created_at} />
                                </p>
                            </div>
                        </div>

                        <div className="my-1 border-t border-gray-700" />


                        <div onClick={() =>
                            navigate(`${detailPath}/${blog.id}`, {
                                state: { from: title === "Explore Posts" ? "explore" : "my-posts" }
                            })
                        } className="border-l-4 border-brand-3 bg-brand-3/20 pl-3 py-3">
                            <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                            <p className="text-white/80 mt-2">{blog.description}</p>
                        </div>

                        <div className="my-1 border-t border-gray-700" />

                        {/* Likes / Dislikes / Comments */}
                        <div className="flex justify-end items-center text-white text-sm mt-3">
                            <div className="flex items-center space-x-5">

                                {/* Like */}
                                <div className="flex items-center space-x-2">
                                    <AiOutlineLike size={18} />
                                    <span>{blog.likes || 0}</span>
                                </div>

                                {/* Dislike (icon only, no count) */}
                                <div className="flex items-center">
                                    <AiOutlineDislike size={18} />
                                </div>

                                {/* Comment */}
                                <div className="flex items-center space-x-2">
                                    <FaRegComment size={16} />
                                    <span>{blog.comments || 0}</span>
                                </div>

                            </div>
                        </div>
                    </div>



                ))
            )}

            {totalPages > 1 && (
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={fetchBlogs}
                />
            )}
        </div>
    );
}
