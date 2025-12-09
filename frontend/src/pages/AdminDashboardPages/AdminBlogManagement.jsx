import BlogListPage from "../BlogPage/BlogListPage";

export default function AdminBlogManagement() {
    return (
        <BlogListPage
            apiEndpoint="/blog/admin-blogs/"
            title="All Blogs"
            detailPath="../blog-details"
            breadcrumbItems={[
                { label: "Dashboard", link: "/" },
                { label: "All Blogs" },
            ]}
            showCreateButton={true}
            isAdmin={true}
        />
    );
}
