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

const primaryColor = "#df6c4f";

const DUMMY_CATEGORIES = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Lifestyle" },
  { id: "3", name: "Travel" },
  { id: "4", name: "Finance" },
];

const Post = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    featuredImage: "",
    excerpt: "",
    slug: "",
    category: "",
    tags: [],
    isPublished: false,
  });
  const [newTag, setNewTag] = useState("");
  const maxTitleLength = 100;
  const maxExcerptLength = 200;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    if (postData.title.length > 0) {
      const generatedSlug = postData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setPostData((prev) => ({ ...prev, slug: generatedSlug }));
    } else {
      setPostData((prev) => ({ ...prev, slug: "" }));
    }
  }, [postData.title]);

  // Handle adding new tags
  const handleAddTag = (e) => {
    e.preventDefault();
    const tagToAdd = newTag.trim().toLowerCase();
    if (tagToAdd && !postData.tags.includes(tagToAdd)) {
      setPostData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagToAdd],
      }));
      setNewTag("");
    }
  };

  // Handle removing tags
  const handleRemoveTag = (tagToRemove) => {
    setPostData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (action) => {
    const status = action === "publish" ? "Published" : "Draft";
    console.log(`Submitting post as ${status}:`, postData);

    // Basic validation
    if (!postData.title || !postData.content || !postData.category) {
      console.error(
        `Title, Content, and Category are required! Failed to ${action}.`
      );
      return;
    }
    console.log(`Post saved successfully as ${status}!`);
  };

  const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    icon: Icon,
    placeholder,
    maxLength,
    required = false,
  }) => (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 flex items-center"
      >
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-500" />}
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150`}
      />
      {maxLength && (
        <p className="text-xs text-right text-gray-400">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 px-5 sm:px-5 md:px-10 lg:px-20 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium text-gray-900 flex items-center">
            <Edit3 className="w-8 h-8 mr-3" style={{ color: primaryColor }} />
            New Blog Post
          </h1>
          <div className="flex space-x-3">
            <button
              onClick={() => handleSubmit("draft")}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Draft
            </button>
            <button
              onClick={() => handleSubmit("publish")}
              className={`flex items-center px-6 py-2 rounded-lg text-white font-semibold shadow-md transition duration-150 transform hover:scale-[1.02]`}
              style={{ backgroundColor: primaryColor }}
            >
              <Globe className="w-5 h-5 mr-2" />
              Publish
            </button>
          </div>
        </header>

        {/* Main Editor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <label
                htmlFor="title"
                className="block text-lg font-bold text-gray-700 flex items-center mb-2"
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
                className={`text-2xl font-semibold w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[${primaryColor}] focus:ring-0 focus:outline-none transition duration-200`}
              />
              <p className="text-sm text-right text-gray-400 mt-2">
                {postData.title.length} / {maxTitleLength}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg h-[500px] border border-gray-100">
              <label
                htmlFor="content"
                className="block text-lg font-bold text-gray-700 flex items-center mb-2"
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
                className={`w-full h-[calc(100%-40px)] p-4 text-gray-800 border-2 border-gray-100 rounded-lg resize-none focus:outline-none focus:border-primary transition duration-150`}
              />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
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
                    className={`form-checkbox h-5 w-5 rounded-full border-gray-300 focus:ring-primary`}
                    style={{ accentColor: primaryColor }}
                  />
                </div>
              </div>
            </div>

            {/* Post Details Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <List className="w-5 h-5 mr-2 text-primary" />
                Post Details
              </h3>

              <InputField
                label="Featured Image URL"
                name="featuredImage"
                value={postData.featuredImage}
                onChange={handleChange}
                icon={Image}
                placeholder="e.g., https://unsplash.com/image.jpg"
              />

              {/* Excerpt */}
              <div className="space-y-1">
                <label
                  htmlFor="excerpt"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
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
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150`}
                  rows="3"
                />
                <p className="text-xs text-right text-gray-400">
                  {postData.excerpt.length} / {maxExcerptLength}
                </p>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="slug"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
                >
                  <Link className="w-4 h-4 mr-2 text-gray-500" />
                  SEO Slug (URL Path)
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={postData.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-150 text-sm"
                />
              </div>
            </div>

            {/* Categorization & Tags Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-3 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-primary" />
                Taxonomy
              </h3>

              {/* Category Dropdown */}
              <div className="space-y-1">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 flex items-center"
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
                  required
                  className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 bg-white appearance-none`}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {DUMMY_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-gray-500" />
                  Tags
                </label>
                <form onSubmit={handleAddTag} className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag and press Enter"
                    className={`flex-grow px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[${primaryColor}]`}
                  />
                  <button
                    type="submit"
                    className="p-2 bg-primary rounded-lg text-white font-medium shadow-sm flex items-center justify-center"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </form>

                {/* Tag List */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {postData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 transition duration-150"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag}
                      <X className="ml-2 w-3 h-3 text-gray-600" />
                    </span>
                  ))}
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
