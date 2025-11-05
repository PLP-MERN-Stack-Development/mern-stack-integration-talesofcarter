const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");
const { deleteFile } = require("../utils/fileCleanup");
const slugify = require("slugify");

// GET all posts (public)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET single post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate("category", "name");
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// CREATE post
const createPost = async (req, res) => {
  const { title, content, excerpt, category, tags, isPublished } = req.body;
  let featuredImage = "default-post.jpg";

  if (!title || !content || !category) {
    if (req.file) deleteFile(req.file.path);
    return res
      .status(400)
      .json({ error: "Title, content, and category required" });
  }

  try {
    const slug = slugify(title, { lower: true, strict: true });

    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      if (req.file) deleteFile(req.file.path);
      return res.status(409).json({
        error:
          "A post with this title already exists. Please choose a unique title.",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "quickblog/posts",
        width: 1200,
        crop: "scale",
      });
      featuredImage = result.secure_url;
    }

    const post = await Post.create({
      title,
      content,
      excerpt,
      featuredImage,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      isPublished: isPublished === "true",
      author: req.user.id,
      slug,
    });

    if (req.file) deleteFile(req.file.path);

    const populated = await Post.findById(post._id)
      .populate("author", "username")
      .populate("category", "name");

    res.status(201).json(populated);
  } catch (err) {
    if (req.file) deleteFile(req.file.path);
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    const updates = req.body;

    if (updates.title && updates.title !== post.title) {
      const newSlug = slugify(updates.title, { lower: true, strict: true });

      const existingPost = await Post.findOne({
        slug: newSlug,
        _id: { $ne: req.params.id },
      });
      if (existingPost) {
        return res.status(409).json({
          error:
            "Another post with this title already exists. Please choose a unique title.",
        });
      }

      updates.slug = newSlug;
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "quickblog/posts",
      });
      updates.featuredImage = result.secure_url;
    }

    Object.assign(post, updates);
    await post.save();

    if (req.file) deleteFile(req.file.path);

    const populated = await Post.findById(post._id)
      .populate("author", "username")
      .populate("category", "name");
    res.json(populated);
  } catch (err) {
    if (req.file) deleteFile(req.file.path);
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ error: "Not authorized" });

    if (post.featuredImage && !post.featuredImage.includes("default")) {
      const publicId = post.featuredImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`quickblog/posts/${publicId}`);
    }

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
