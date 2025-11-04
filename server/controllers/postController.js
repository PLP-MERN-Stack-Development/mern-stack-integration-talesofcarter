const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const validator = require("validator");

// GET all posts (public)
getPosts = async (req, res) => {
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
getPost = async (req, res) => {
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

// CREATE post (protected + image upload)
createPost = async (req, res) => {
  const { title, content, excerpt, category, tags, isPublished } = req.body;
  let featuredImage = "default-post.jpg";

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: "Title, content, and category required" });
  }

  try {
    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "quickblog/posts",
        width: 1200,
        crop: "scale",
      });
      featuredImage = result.secure_url;
      fs.unlinkSync(req.file.path); // delete local file
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
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username")
      .populate("category", "name");

    res.status(201).json(populatedPost);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE post
updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updates = req.body;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "quickblog/posts",
      });
      updates.featuredImage = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    Object.assign(post, updates);
    await post.save();

    const populated = await Post.findById(post._id)
      .populate("author", "username")
      .populate("category", "name");
    res.json(populated);
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE post
deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (post.featuredImage && !post.featuredImage.includes("default")) {
      const publicId = post.featuredImage.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`quickblog/posts/${publicId}`);
    }

    await post.remove();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
