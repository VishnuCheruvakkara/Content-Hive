import React, { useState, useEffect } from "react";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import Breadcrumb from "../../components/ui/BreadCrumb";
import Pagination from "../../components/ui/Pagination";
import SearchBar from "../../components/ui/SearchBar";
import NoDataFallback from "../../components/ui/NoDataFallback";
import FormattedDate from "../../components/ui/FormattedData";
import useDebounce from "../../hooks/useDebounce";
import InlineSpinner from "../../components/ui/InlineSpinner";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import { MdCheckCircle, MdBlock } from "react-icons/md";


export default function UserManagementPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toggleAction, setToggleAction] = useState("");

    const debouncedSearch = useDebounce(search, 800);
    const pageSize = 5;

    const fetchUsers = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const response = await userAuthenticateAxios.get("/users/users-list/", {
                params: { page: pageNumber, q: debouncedSearch },
            });

            setUsers(response?.data?.results || []);
            setPage(pageNumber);

            const count = response?.data?.count || 0;
            setTotalPages(Math.ceil(count / pageSize));
        } catch (error) {
            console.error("Fetch Users Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, [debouncedSearch]);

    const breadcrumbItems = [
        { label: "Dashboard", link: "/admin/dashboard" },
        { label: "Users" }
    ];

    // Open modal for toggle confirmation
    const handleToggleClick = (user, action) => {
        setSelectedUser(user);
        setToggleAction(action);
        setIsModalOpen(true);
    };

    // Confirm toggle action
    const handleToggleConfirm = async () => {
        if (!selectedUser) return;

        try {
            const response = await userAuthenticateAxios.patch(
                `/users/toggle-user-status/${selectedUser.id}/`,
                { action: toggleAction }
            );

            toast.success(`User ${toggleAction}d successfully`);

            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === selectedUser.id ? { ...u, is_active: response.data.is_active } : u
                )
            );
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsModalOpen(false);
            setSelectedUser(null);
        }
    };

    return (
        <div className="p-4">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-white">User Management</h1>
            </div>

            {/* Search */}
            <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search users..."
            />

            {/* Loading / No Data / Table */}
            {loading ? (
                <div className="flex justify-center mt-6">
                    <InlineSpinner size={45} />
                </div>
            ) : users.length === 0 ? (
                <NoDataFallback message="No users found." />
            ) : (
                <div className="bg-gray-900/50 rounded-md overflow-hidden border border-gray-700 mt-4">
                    {/* TABLE HEADER */}
                    <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-gray-300 font-medium">Users List</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[650px]">
                            <thead>
                                <tr className="text-gray-400 text-sm">
                                    <th className="py-3 px-4 border-b border-gray-700">SL</th>
                                    <th className="py-3 px-4 border-b border-gray-700">User</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Email</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Date Joined</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => {
                                    const serialNumber = (page - 1) * pageSize + (index + 1);

                                    return (
                                        <tr key={user.id} className="text-white text-sm">
                                            <td className="py-4 px-4 border-b border-gray-700">{serialNumber}</td>

                                            <td className="py-4 px-4 border-b border-gray-700">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-9 h-9 bg-brand-3 rounded-md text-white flex items-center justify-center font-semibold">
                                                        {user.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{user.username}</span>
                                                </div>
                                            </td>

                                            <td className="py-4 px-4 border-b border-gray-700">{user.email}</td>

                                            <td className="py-4 px-4 border-b border-gray-700">
                                                <FormattedDate dateString={user?.date_joined} />
                                            </td>

                                            <td className="py-4 px-4 border-b border-gray-700">
                                                <Button
                                                    onClick={() =>
                                                        handleToggleClick(user, user.is_active ? "deactivate" : "activate")
                                                    }
                                                    icon={user.is_active ? MdCheckCircle : MdBlock}
                                                    className={`
                                                        w-28
                                                        px-4 py-2 rounded-sm text-sm cursor-pointer 
                                                        flex items-center justify-center gap-2
                                                        ${user.is_active
                                                            ? "bg-brand-4 text-brand-1 font-semibold"
                                                            : "bg-brand-3 text-white font-semibold"
                                                        }
                                                    `}
                                                >
                                                    {user.is_active ? "Active" : "Inactive"}
                                                </Button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-4">
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={fetchUsers}
                    />
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                title={`${toggleAction === "activate" ? "Activate" : "Deactivate"} User`}
                message={`Are you sure you want to ${toggleAction} this user?`}
                confirmText={toggleAction === "activate" ? "Activate" : "Deactivate"} // dynamic button text
                onConfirm={handleToggleConfirm}
                onCancel={() => setIsModalOpen(false)}
            />

        </div>
    );
}
