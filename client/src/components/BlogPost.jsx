import { Link } from "react-router";
import { mockPosts } from "../assets/data/blog";
import { FiUser } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Post = () => {
  if (!mockPosts || mockPosts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <p className="text-center text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {mockPosts.map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col grow">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                {post.category ? (
                  <span className="inline-block bg-indigo-100 text-primary px-2 py-0.5 rounded-full font-semibold">
                    {post.category.name}
                  </span>
                ) : (
                  <span></span>
                )}
                <div className="flex items-center gap-2">
                  <GoCalendar className="w-4 h-4 text-gray-500" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
              </div>

              <h2 className="text-lg text-left font-bold text-gray-900 mb-2 group-hover:text-primary">
                {post.title}
              </h2>

              <p className="text-gray-700 text-sm text-left mb-4 line-clamp-3 grow">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                {post.author && (
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <FiUser className="w-5 h-5 mr-2 text-gray-600" />
                    <span className="font-medium">{post.author.name}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Post;
