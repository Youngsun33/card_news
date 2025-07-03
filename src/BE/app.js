const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // .env 파일 사용

// 라우터 임포트 (실제 라우터 파일명에 맞게 수정 필요)
// const noteRouter = require("./routes/notes");
const chatRouter = require("./routers/chat");
const postRouter = require("./routers/posts");
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const models = require("./models");
const app = express();
const { logger, logging } = require("./middlewares/logger");
const newsRouter = require("./routers/news");
// const likesRouter = require("./routers/likes"); // 좋아요 라우터 임포트 주석 처리

// 미들웨어 설정
app.use(logging); // 로깅 미들웨어
app.use(express.json()); // json 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const uploadDir = path.join(__dirname, "public", "uploads");
app.use("/downloads", express.static(uploadDir));

// 번역 API 엔드포인트 통합
app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const deeplKey = process.env.DEEPL_KEY;

  try {
    console.log("번역 요청:", text);

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        auth_key: deeplKey,
        text: text,
        target_lang: "KO",
      }),
    });

    const data = await response.json();

    console.log("DeepL 응답:", data);

    if (data.message || data.error) {
      console.error("DeepL API Error:", data);
      return res.status(500).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// 실제 라우터 연결 (주석 해제 및 파일명 맞게 수정 필요)
// app.use("/notes", noteRouter);
// app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/api/news", newsRouter);
app.use("/chat", chatRouter);
// app.use("/api/likes", likesRouter); // 좋아요 라우터 제거(요청 전 상태로 복구)

// 404 처리
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없어요 ",
  });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: `server error : ${err.stack}`,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다. `);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
