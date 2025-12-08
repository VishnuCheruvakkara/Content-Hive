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

export default function BlogListPage({
    apiEndpoint,
    title,
    breadcrumbItems,
    showCreateButton = false,
    detailPath = "/user/blog-details",
}) {
    const navigate = useNavigate();

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

            console.log("Blog Lists :",response?.data?.results )

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
                    <button
                        className="bg-brand-3 px-4 py-2 rounded text-white"
                        onClick={() => navigate("create-article")}
                    >
                        Create Article
                    </button>
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
                        onClick={() => navigate(`${detailPath}/${blog.id}`,{state:{ from: title === "Explore Posts" ? "explore" : "my-posts" }})}

                    >
                        <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                        <p className="text-white/80 mt-2">{blog.description}</p>

                        <div className="my-3 border-t border-gray-700" />

                        <div className="flex justify-between items-center text-white text-sm">
                            <FormattedDate dateString={blog.created_at} />
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <AiOutlineLike size={18} /> {blog.likes || 0}
                                </div>
                                <div className="flex items-center space-x-1">
                                    <AiOutlineDislike size={18} /> {blog.dislikes || 0}
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FaRegComment size={16} /> {blog.comments || 0}
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
