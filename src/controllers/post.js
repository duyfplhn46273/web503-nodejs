let posts = [
    { id: 1, title: "Bài viết 1", content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", content: "Nội dung bài viết 2" },
];


export function getPosts(req, res){
    try {
        const { search } = req.query;

        // Không có bài viết nào trong hệ thống
        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: "Không có bài viết nào" });
        }

        // Nếu có tham số search: lọc theo tiêu đề (không phân biệt hoa thường)
        if (typeof search === "string" && search.trim() !== "") {
            const keyword = search.trim().toLowerCase();
            const filtered = posts.filter((p) => (p.title || "").toLowerCase().includes(keyword));
            return res.json(filtered);
        }

        // Không có search: trả về tất cả bài viết
        return res.json(posts);
    } catch (error) {
        console.error("getPosts error:", error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách bài viết" });
    }
}

export function getPostById(req, res){
    const id = parseInt(req.params.id);
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Không tìm thấy bài viết" });
    }
    res.json(post);
}

export function addPost(req, res){
    const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Thiếu title hoặc content" });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
  };

  posts.push(newPost);
  res.status(201).json(newPost);
}

export function updatePost(req, res){
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: "Post not found" });

    const { title, content } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;

    res.json(post);
}

export function deletePost(req, res){
  const id = parseInt(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Không tìm thấy bài viết" });
  }

  const deletedPost = posts.splice(index, 1);
  res.json(deletedPost[0]);
}