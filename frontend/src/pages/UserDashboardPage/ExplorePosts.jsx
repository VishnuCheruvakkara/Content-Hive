import BlogListPage from "../BlogPage/BlogListPage";

export default function ExplorePosts() {
    return (
        <BlogListPage
            apiEndpoint="/blog/explore-blogs/"
            title="Explore Posts"
            detailPath="../blog-details"
            breadcrumbItems={[
                { label: "Home", link: "/" },
                { label: "Explore Posts" },
            ]}
        />
    );
}
