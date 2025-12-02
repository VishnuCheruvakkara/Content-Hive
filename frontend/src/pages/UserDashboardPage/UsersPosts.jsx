import React from "react";

// Dummy data for demo. Replace with API data later
const posts = [
  {
    id: 1,
    title: "Understanding React Router v6",
    excerpt: "Learn how to navigate and manage routes in React Router v6...",
    date: "Nov 28, 2025",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    title: "Tailwind CSS Tips & Tricks",
    excerpt: "Master Tailwind CSS with these advanced tips for your projects...",
    date: "Nov 25, 2025",
    likes: 8,
    comments: 2,
  },
  {
    id: 3,
    title: "Building a CMS with Django & React",
    excerpt: "Step-by-step guide on building a full-stack CMS using Django REST API and React...",
    date: "Nov 20, 2025",
    likes: 15,
    comments: 5,
  },
];

export default function UserPosts() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Your Blog Posts</h1>

      {posts.length === 0 ? (
        <p className="text-white/70">No posts yet. Start writing your first blog!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition transform"
            >
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-white/70 text-sm mb-4">{post.excerpt}</p>
              <div className="flex justify-between text-white/60 text-xs">
                <span>{post.date}</span>
                <span>
                  ❤️ {post.likes} · 💬 {post.comments}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
