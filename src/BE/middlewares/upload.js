// 파일 업로드 미들웨어 (multer 사용)
// 이미지 등 파일 업로드를 처리하는 미들웨어입니다.
// 업로드 관련 미들웨어
const multer = require("multer");
const path = require("path");
const uploadDir = `public/uploads`;

const storage = multer.diskStorage({
  destination: `./${uploadDir}`,
  filename: function (req, file, cb) {
    let originalName = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const fname = originalName + "-" + Date.now() + path.extname(originalName);
    cb(null, fname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
const uploadSingle = upload.single("file");
const uploadMultiple = upload.array("files", 5); // 최대 5개 파일까지 업로드 가능
module.exports = {
  uploadSingle,
  uploadMultiple,
};
