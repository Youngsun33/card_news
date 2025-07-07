// 번역 API 서버 예시 코드 (Express)
// 프론트엔드 개발용 번역 테스트 서버입니다.
// 실제 서비스에서는 보안 및 성능을 고려하여 적절한 조치를 취해야 합니다.

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const deeplKey = "13419ae6-0609-41b4-a24c-65ff40d15866:fx";

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
    31;
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
