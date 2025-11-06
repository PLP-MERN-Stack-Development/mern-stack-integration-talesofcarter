import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getPosts } from "../services/postService";
import { FiUser } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await getPosts();
        setPosts(data.slice(0, 4)); // Only first 4
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Featured Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post.slug}`}
            className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={post.featuredImage || "/placeholder.jpg"}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col grow">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                <span className="inline-block bg-indigo-100 text-primary px-2 py-0.5 rounded-full font-semibold">
                  {post.category?.name || "General"}
                </span>
                <div className="flex items-center gap-2">
                  <GoCalendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3 grow">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                <div className="flex items-center text-sm text-gray-600">
                  <FiUser className="w-5 h-5 mr-2" />
                  <span className="font-medium">{post.author?.username}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPost;
