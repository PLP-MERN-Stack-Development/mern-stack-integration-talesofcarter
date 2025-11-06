import { useState, useEffect } from "react";
import {
  Image,
  Save,
  Globe,
  Tag,
  Check,
  Link,
  Edit3,
  Type,
  Feather,
  List,
  X,
} from "lucide-react";
import { createPost } from "../services/postService";
import { categoryService } from "../services/api";
import { toast } from "react-hot-toast";

const primaryColor = "#df6c4f";

const Post = () => {
  const user = { id: "user123", name: "Demo User" };
  const [loading, setLoading] = useState(false);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    featuredImage: null,
    excerpt: "",
    slug: "",
    category: "",
    tags: [],
    isPublished: false,
  });
  const [newTag, setNewTag] = useState("");
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const maxTitleLength = 100;
  const maxExcerptLength = 200;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (err) {
        toast.error("Failed to load categories");
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (postData.title) {
      const generatedSlug = postData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/(^-|-$)/g, "");
      setPostData((prev) => ({ ...prev, slug: generatedSlug }));
    } else {
      setPostData((prev) => ({ ...prev, slug: "" }));
    }
  }, [postData.title]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = () => {
    const tagToAdd = newTag.trim().toLowerCase();
    if (!tagToAdd) {
      return;
    }
    setPostData((prev) => ({
      ...prev,
      tags: [...prev.tags, tagToAdd],
    }));
    setNewTag("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (action) => {
    if (!postData.title.trim()) {
      // showToast("Title is required", "error"); // <-- REPLACE
      toast.error("Title is required"); // <-- WITH THIS
      return;
    }
    if (!postData.content.trim()) {
      // showToast("Content is required", "error"); // <-- REPLACE
      toast.error("Content is required"); // <-- WITH THIS
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", postData.title.trim());
    formData.append("content", postData.content.trim());
    formData.append("excerpt", postData.excerpt.trim());
    formData.append("slug", postData.slug); // Note: Your backend auto-generates this, so sending it is optional
    formData.append("category", postData.category);
    formData.append("tags", postData.tags.join(","));
    formData.append("isPublished", action === "publish" ? "true" : "false");

    if (postData.featuredImage) {
      formData.append("featuredImage", postData.featuredImage);
    }

    try {
      // await mockPostService.createPost(formData); // <-- REPLACE THIS
      await createPost(formData); // <-- WITH THIS

      // showToast(...) // <-- REPLACE THIS
      toast.success(
        `Post ${
          action === "publish" ? "published" : "saved as draft"
        } successfully!`
      );
      // ... (rest of the state reset logic)
    } catch (err) {
      const msg =
        err.response?.data?.error || err.message || "Failed to save post";
      // showToast(msg, "error"); // <-- REPLACE THIS
      toast.error(msg); // <-- WITH THIS
      console.error("Post creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-5 sm:px-5 md:px-10 lg:px-20 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-2xl font-medium text-gray-900 flex items-center">
            <Edit3 className="w-8 h-8 mr-3" style={{ color: primaryColor }} />
            New Blog Post
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => handleSubmit("draft")}
              disabled={loading}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit("publish")}
              disabled={loading}
              className="flex items-center px-6 py-2 rounded-lg text-white font-semibold shadow-md transition duration-150 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: primaryColor }}
            >
              <Globe className="w-5 h-5 mr-2" />
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
          <label className="text-sm font-semibold text-gray-700 flex items-center mb-2">
            <Image className="w-4 h-4 mr-2 text-gray-500" />
            Featured Image
          </label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500"
          />
          <style>{`
            input[type="file"]::file-selector-button {
              background-color: ${primaryColor};
              color: white;
              padding: 0.5rem 1rem;
              border: none;
              border-radius: 9999px;
              font-size: 0.875rem;
              font-weight: 600;
              cursor: pointer;
              margin-right: 1rem;
            }
            input[type="file"]::file-selector-button:hover {
              opacity: 0.8;
            }
          `}</style>
          {postData.featuredImage && (
            <div className="mt-3 flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <Check className="w-4 h-4 mr-2" />
              Image selected: {postData.featuredImage.name}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <label
                htmlFor="title"
                className="text-lg font-bold text-gray-700 flex items-center mb-2"
              >
                <Type
                  className="w-6 h-6 mr-2"
                  style={{ color: primaryColor }}
                />
                Post Title
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={postData.title}
                onChange={handleChange}
                placeholder="Enter a compelling title (max 100 characters)"
                maxLength={maxTitleLength}
                required
                className="text-2xl font-semibold w-full px-4 py-3 border-b-2 border-gray-200 focus:outline-none transition duration-200"
                style={{
                  borderBottomColor: postData.title ? primaryColor : undefined,
                }}
              />
              <p className="text-sm text-right text-gray-400 mt-2">
                {postData.title.length} / {maxTitleLength}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg h-auto border border-gray-100">
              <label
                htmlFor="content"
                className="text-lg font-bold text-gray-700 flex items-center mb-2"
              >
                <Feather
                  className="w-5 h-5 mr-2"
                  style={{ color: primaryColor }}
                />
                Post Content
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={postData.content}
                onChange={handleChange}
                placeholder="Start writing your amazing blog post here..."
                required
                className="w-full h-96 p-4 text-gray-800 border-2 border-gray-100 rounded-lg resize-none focus:outline-none transition duration-150"
                style={{
                  borderColor: postData.content ? primaryColor : undefined,
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <Globe
                  className="w-5 h-5 mr-2"
                  style={{ color: primaryColor }}
                />
                Publish Status
              </h3>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="isPublished"
                  className="text-gray-700 font-medium"
                >
                  Ready to Publish?
                </label>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-semibold mr-3 ${
                      postData.isPublished ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {postData.isPublished ? "Published" : "Draft"}
                  </span>
                  <input
                    id="isPublished"
                    name="isPublished"
                    type="checkbox"
                    checked={postData.isPublished}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 cursor-pointer"
                    style={{ accentColor: primaryColor }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <List
                  className="w-5 h-5 mr-2"
                  style={{ color: primaryColor }}
                />
                Post Details
              </h3>

              <div className="space-y-1">
                <label
                  htmlFor="excerpt"
                  className="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Feather className="w-4 h-4 mr-2 text-gray-500" />
                  Excerpt (Short Summary)
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={postData.excerpt}
                  onChange={handleChange}
                  placeholder="A short summary for previews (max 200 characters)"
                  maxLength={maxExcerptLength}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 transition duration-150"
                  rows={3}
                />
                <p className="text-xs text-right text-gray-400">
                  {postData.excerpt.length} / {maxExcerptLength}
                </p>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="slug"
                  className="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Link className="w-4 h-4 mr-2 text-gray-500" />
                  SEO Slug (URL Path)
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={postData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150 text-sm"
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">
                  Auto-generated from title
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <Tag className="w-5 h-5 mr-2" style={{ color: primaryColor }} />
                Taxonomy
              </h3>

              <div className="space-y-1">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-gray-700 flex items-center"
                >
                  <List className="w-4 h-4 mr-2 text-gray-500" />
                  Category
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={postData.category}
                  onChange={handleChange}
                  disabled={loadingCategories}
                  className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-150 bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="" disabled>
                    {loadingCategories
                      ? "Loading categories..."
                      : "Select a category"}
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {!loadingCategories && categories.length === 0 && (
                  <p className="text-xs text-amber-600 mt-1">
                    No categories available. Please create categories first.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  Tags
                  <span className="text-xs text-gray-500 ml-2">(max 10)</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    placeholder="Add a tag and press Enter"
                    className="grow px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 transition"
                    maxLength={30}
                  />
                  <button
                    onClick={handleAddTag}
                    className="p-2 rounded-lg text-white font-medium shadow-sm flex items-center justify-center hover:opacity-90 transition"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 min-h-10">
                  {postData.tags.length === 0 ? (
                    <p className="text-sm text-gray-400 italic">
                      No tags added yet
                    </p>
                  ) : (
                    postData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 transition duration-150"
                        onClick={() => handleRemoveTag(tag)}
                        title="Click to remove"
                      >
                        {tag}
                        <X className="ml-2 w-3 h-3 text-gray-600" />
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
