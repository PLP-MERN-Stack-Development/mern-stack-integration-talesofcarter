// routes/posts.js
const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, upload.single("featuredImage"), createPost);
router.put("/:id", auth, upload.single("featuredImage"), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
