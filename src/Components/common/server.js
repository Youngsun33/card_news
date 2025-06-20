const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { text } = req.body;
  const deeplKey = "f23d9128-732c-453d-9fa5-957b0474c48c:fx";

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
