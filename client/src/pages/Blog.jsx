import React, { useState } from "react";
import { Link } from "react-router";
import { mockPosts } from "../utils/mockData"; // Import mock data

function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = mockPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(e.target.value.toLowerCase())
        )
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full max-w-md mx-auto px-4 py-2 border rounded-lg mb-8"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            {post.featuredImage && (
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-40 object-cover mb-4 rounded"
              />
            )}
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <Link
              to={`/blog/${post.slug}`}
              className="text-primary hover:underline"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
      {/* Pagination: Add buttons here */}
    </div>
  );
}

export default Blog;
