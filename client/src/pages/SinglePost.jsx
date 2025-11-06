import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../services/postService";
import { FiUser } from "react-icons/fi";
import { GoCalendar } from "react-icons/go";

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading post...</div>;
  if (!post)
    return (
      <div className="text-center text-2xl m-20 md:text-3xl lg:text-4xl bg-primary py-20 text-white rounded-2xl">
        Post not found.
      </div>
    );

  return (
    <article className="container mx-auto px-4 py-10 max-w-4xl">
      <Link
        to="/blog"
        className="text-primary hover:underline mb-6 inline-block"
      >
        ← Back to Blog
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FiUser />
            <span>{post.author?.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <GoCalendar />
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <span className="bg-indigo-100 text-primary px-3 py-1 rounded-full">
            {post.category?.name}
          </span>
        </div>
      </header>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-96 object-cover rounded-lg mb-8"
        />
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default SinglePost;
