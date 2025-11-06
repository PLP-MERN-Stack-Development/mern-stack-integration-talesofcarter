import api from "./api";

export const getPosts = () => api.get("/posts");
export const getPostBySlug = (slug) => api.get(`/posts/slug/${slug}`);
export const createPost = (formData) => api.post("/posts", formData);
