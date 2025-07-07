// 텍스트 번역 함수 (DeepL API 연동)
// 입력된 텍스트를 번역 서버에 요청하여 번역 결과를 반환합니다.

// Translate.js
export default async function TranslateText(text) {
  try {
    const response = await fetch("http://localhost:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error("Translation error:", error);
    return null;
  }
}
