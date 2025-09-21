import { Router } from "express";

const postRouter = Router();

// endpoint: /posts?name=abc
postRouter.get("/", (req, res) => {
    console.log(req.query?.name);
  res.send("Post" + req.query?.name);
});

// endpoint: /posts/detai/:id
postRouter.get("/detail/:id", (req, res) => {
  res.send("Post detailcó id la:" + req.params?.id);
});

export default postRouter;