// 회원가입 등 요청 데이터 유효성 검사 미들웨어
// Joi 스키마를 이용해 입력값을 검증하고, 에러 발생 시 응답을 반환합니다.

const { registerSchema } = require("../utlis/validation");

const validateRegister = (req, res, next) => {
  // registerSechema를 이용해서 입력데이터를 검증합니다.

  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next(); // 다음 미들웨어나 컨트롤러로 이동합니다.
};

module.exports = {
  validateRegister,
};
