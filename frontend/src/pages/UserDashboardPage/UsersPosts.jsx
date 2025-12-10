import BlogListPage from "../BlogPage/BlogListPage";

export default function UserPosts() {
  return (
    <BlogListPage
      apiEndpoint="/blog/get-users-blog/"
      title="My Blog Posts"
      showCreateButton={true}
      detailPath="blog-details" 
      breadcrumbItems={[
        { label: "Home", link: "/" },
        { label: "My Blog Posts" },
      ]}
    />
  );
}

