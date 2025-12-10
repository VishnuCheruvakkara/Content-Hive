import React, { useEffect, useState } from "react";
import { FaUsers, FaBlog, FaComments, FaEye, FaThumbsUp } from "react-icons/fa";
import userAuthenticateAxios from "../../axios/UserAuthenticateAxios";
import InlineSpinner from "../../components/ui/InlineSpinner";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    totalLikes: 0,
  });

  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  const fetchDashboardStats = async () => {
    try {
      const response = await userAuthenticateAxios.get("/users/admin-dashboard-stats/");
      const data = response.data;

      setStats({
        totalUsers: data.total_users,
        totalPosts: data.total_posts,
        totalComments: data.total_comments,
        pendingComments: data.pending_comments,
        totalLikes: data.total_likes,
      });

    } catch (error) {
      // console.error("Dashboard API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);



  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* USERS */}
        <DashboardCard
          icon={<FaUsers size={40} className="text-blue-400" />}
          title="Total Users"
          value={stats.totalUsers}
        />

        {/* POSTS */}
        <DashboardCard
          icon={<FaBlog size={40} className="text-green-400" />}
          title="Total Blog Posts"
          value={stats.totalPosts}
        />

        {/* COMMENTS */}
        <DashboardCard
          icon={<FaComments size={40} className="text-yellow-400" />}
          title="Total Comments"
          value={stats.totalComments}
        />

        {/* LIKES */}
        <DashboardCard
          icon={<FaThumbsUp size={40} className="text-pink-400" />}
          title="Total Likes"
          value={stats.totalLikes}
        />

      </div>
    </div>
  );
}


function DashboardCard({ icon, title, value, loading }) {
  return (
    <div className="bg-gray-900/60 p-6 rounded-lg border border-gray-700 flex items-center gap-4">
      {icon}
      <div>
        <p className="text-sm text-gray-400">{title}</p>

        {loading ? (
          <InlineSpinner size={24} />
        ) : (
          <h2 className="text-2xl font-semibold">{value}</h2>
        )}
      </div>
    </div>
  );
}