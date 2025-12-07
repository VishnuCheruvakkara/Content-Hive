import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import InlineSpinner from "../../components/ui/InlineSpinner";
import toast from "react-hot-toast";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";  // <-- ADD THIS
import useDebounce from "../../hooks/useDebounce";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import FormattedDate from "../../components/ui/FormattedData";
import Breadcrumb from "../../components/ui/BreadCrumb";

export default function UserPosts() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const debouncedSearch = useDebounce(search, 1000);

  const fetchUserBlogs = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await userAuthenticateAxios.get(
        "/blog/get-users-blog/",
        {
          params: { page: pageNumber, q: debouncedSearch },
        }
      );

      setBlogs(response?.data?.results || []);
      setPage(pageNumber);

      const count = response?.data?.count || 0;
      setTotalPages(Math.ceil(count / 5));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogs(1);
  }, [debouncedSearch]);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "My Blog Posts" },
  ];

  return (
    <div className="p-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">My Blog Posts</h1>
        <Button
          icon={MdAdd}
          className="bg-brand-3 text-white px-4 py-3"
          onClick={() => navigate("create-article")}
        >
          Create Article
        </Button>
      </div>

      {/* Search Component */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search blogs..."
      />

      {/* Blog list */}
      {loading ? (
        <InlineSpinner size={45} />
      ) : blogs?.length === 0 ? (
        <div className="p-6 bg-gray-900/50 rounded border border-gray-700 text-center flex flex-col items-center">
          <img src="/no_search.svg" alt="No blogs" className="w-60 h-60" />
          <p className="text-white font-medium text-sm">No blogs found.</p>
        </div>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog?.id}
            className="mb-6 p-4 bg-gray-900/50 rounded hover:bg-gray-900/70 transition shadow-md shadow-black/30"
          >
            <div className="cursor-pointer">
              <h3 className="text-xl font-bold text-white">{blog?.title}</h3>
              <p className="text-white/80 mt-2">{blog?.description}</p>
            </div>
            <div className="my-3 border-t border-gray-700" />
            <div className="flex justify-between items-center text-white text-sm">
              <div>
                <FormattedDate dateString={blog?.created_at} />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-3 transition">
                  <AiOutlineLike size={18} />
                  <span>{blog?.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500 transition">
                  <AiOutlineDislike size={18} />
                  <span>{blog?.dislikes || 0}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-400 transition">
                  <FaRegComment size={16} />
                  <span>{blog?.comments || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))

      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={fetchUserBlogs}
        />
      )}
    </div>
  );
}
