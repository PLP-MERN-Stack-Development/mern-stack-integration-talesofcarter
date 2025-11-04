import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { mockPosts } from "../utils/mockData";

function SinglePost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const foundPost = mockPosts.find((p) => p.slug === slug);
    setPost(foundPost);
    // Mock comments
    setComments([{ id: 1, text: "Great post!" }]);
  }, [slug]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-64 object-cover mb-6 rounded"
        />
      )}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {comments.map((comment) => (
          <p key={comment.id} className="bg-white p-3 rounded mb-2">
            {comment.text}
          </p>
        ))}
        <form onSubmit={handleAddComment} className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border rounded-lg mb-2"
            rows="3"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SinglePost;
