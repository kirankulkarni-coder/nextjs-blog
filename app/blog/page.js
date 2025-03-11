import Blog from "../../components/Blog";

const BlogRoute = async () => {
  const blog = await fetch(`${process.env.SERVER_URL}api/blog`, {
    //cache: "force-cache", // Enables caching (default behavior)
    cache: "no-store", // Disables caching
    //next: { revalidate: 60 }, // Revalidate cache every 60 seconds
  });
  const data = await blog.json();

  return <Blog data={data.data}></Blog>;
};

export default BlogRoute;
