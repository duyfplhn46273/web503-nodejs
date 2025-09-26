import { Router } from "express";

import { getPosts, getPostById, addPost, updatePost, deletePost } from "../controllers/post";

const postRouter = Router();

// GET /api/posts - Lấy danh sách bài viết (hỗ trợ ?search=keyword)
postRouter.get("/", getPosts);

// GET /api/posts/:id - Lấy chi tiết bài viết
postRouter.get("/:id", getPostById);

// POST /api/posts - Thêm bài viết mới
postRouter.post("/", addPost);

// PUT /api/posts/:id - Cập nhật bài viết
postRouter.put("/:id", updatePost);

// DELETE /api/posts/:id - Xóa bài viết
postRouter.delete("/:id", deletePost);

export default postRouter;