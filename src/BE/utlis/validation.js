// Joi를 이용한 회원가입 등 데이터 유효성 검사 스키마 정의
// 입력값 검증을 위한 스키마와 에러 메시지를 정의합니다.

const Joi = require("joi"); // 데이터 유효성 검사도구 불러오기

const registerSchema = Joi.object({
  userId: Joi.string().min(4).max(20).required().messages({
    "string.empty": "아이디는 필수 입력 항목입니다.",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.min": "비밀번호는 최소 6자리 이상이어야 합니다.",
    "string.max": "비밀번호는 최대 30자까지만 가능합니다.",
    "string.empty": "비밀번호는 필수 입력항목 입니다.",
  }),
  name: Joi.string().min(2).max(10).required().messages({
    "string.min": "이름은 최소 2자리 이상입니다.",
    "string.max": "이름은 최대 10자리 까지 입니다.",
    "string.empty": "이름은 필수 입력 항목입니다.",
  }),
  nickname: Joi.string().min(2).max(10).required().messages({
    "string.min": "닉네임은 최소 2자리 이상입니다.",
    "string.max": "닉네임은 최대 10자리 까지 입니다.",
    "string.empty": "닉네임은 필수 입력 항목입니다.",
  }),
});

module.exports = {
  registerSchema,
};
