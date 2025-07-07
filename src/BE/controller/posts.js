// 게시글 및 댓글 관련 컨트롤러 (CRUD, 댓글 등)
// 게시글 작성, 조회, 수정, 삭제와 댓글 관련 기능을 담당합니다.

const models = require("../models");

const createPost = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "인증 정보가 없습니다." });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "title과 content는 필수입니다." });
    }
    const authorId = req.user.userId;
    const authorNickname = req.user.nickname;
    if (!authorId || !authorNickname) {
      return res.status(400).json({ message: "ID 또는 nickname이 없습니다." });
    }
    const post = await models.Post.create({
      title,
      content,
      authorId,
      authorNickname,
    });
    res.status(200).json({ message: "ok", data: post });
  } catch (err) {
    res.status(500).json({ message: "server error", error: err.message });
  }
};

//전체조회
const getPostAll = async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
};

//하나만 조회
const getOnePost = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) return res.status(404).json({ message: "post not found" });

  let likedByMe = false;
  if (req.user) {
    const like = await models.Like.findOne({
      where: { postId: id, userId: req.user.userId },
    });
    likedByMe = !!like;
  }
  res
    .status(200)
    .json({ message: "ok", data: { ...post.toJSON(), likedByMe } });
};

//업데이트
const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
};

//삭제
const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy(id);
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "user not found" });
  }
};

const createComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "인증 정보가 없습니다." });
  }
  // 디버깅용 로그
  console.log("req.user:", req.user);
  const postId = req.params.postId;
  const { content } = req.body;
  // 1. 게시물이 존재여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. comment 추가
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: req.user.userId, // userId는 문자열
    nickname: req.user.nickname, // nickname도 저장
  });
  res.status(201).json({ message: "ok", data: comment });
};

const findComments = async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      {
        model: models.User,
        as: "author",
        attributes: ["userId", "nickname", "name"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물이 있는지 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. 댓글을 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "commment not found" });
  }
  // 3. 댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 1. 게시물 존재확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({ message: " post not found" });
  }
  // 2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
};

module.exports = {
  createPost,
  getPostAll,
  getOnePost,
  updatePost,
  deletePost,
  createComment,
  findComments,
  updateComment,
  deleteComment,
};
