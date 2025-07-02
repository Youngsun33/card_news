import React, { useRef, useEffect, useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const containerRef = useRef(null);
  const [mode, setMode] = useState("sign-in");
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    nickname: "",
  });
  const [loginData, setLoginData] = useState({ userId: "", password: "" });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "회원가입에 실패했습니다.");
      }

      alert("회원가입이 완료되었습니다. 로그인해주세요.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "로그인에 실패했습니다.");
      alert("로그인 성공!");
      // 토큰 저장 등 추가 가능
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.add("sign-in");
    }
  }, []);

  const toggle = () => {
    if (!containerRef.current) return;
    if (mode === "sign-in") {
      containerRef.current.classList.remove("sign-in");
      containerRef.current.classList.add("sign-up");
      setMode("sign-up");
    } else {
      containerRef.current.classList.remove("sign-up");
      containerRef.current.classList.add("sign-in");
      setMode("sign-in");
    }
  };

  return (
    <div id="container" className="container" ref={containerRef}>
      {/* FORM SECTION */}
      <div className="row">
        {/* SIGN UP */}
        <div className="col align-items-center flex-col sign-up">
          <div className="form-wrapper align-items-center">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="userId"
                  placeholder="ID"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="text"
                  name="nickname"
                  placeholder="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="signup-btn"
              >
                Sign up
              </button>
              {error && <p className="error">{error}</p>}
              <p>
                <span>Already have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign in here
                </b>
              </p>
            </div>
          </div>
        </div>
        {/* END SIGN UP */}
        {/* SIGN IN */}
        <div className="col align-items-center flex-col sign-in">
          <div className="form-wrapper align-items-center">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="userId"
                  placeholder="ID"
                  value={loginData.userId}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <button onClick={handleLoginSubmit} disabled={loginLoading}>
                Sign in
              </button>
              {loginError && <p className="error">{loginError}</p>}
              <p>
                <b>Forgot password?</b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Sign up here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
        </div>
        {/* END SIGN IN */}
      </div>
      {/* END FORM SECTION */}
      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* SIGN IN CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in">
            <h2>Welcome</h2>
          </div>
          <div className="img sign-in"></div>
        </div>
        {/* END SIGN IN CONTENT */}
        {/* SIGN UP CONTENT */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up"></div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
        {/* END SIGN UP CONTENT */}
      </div>
      {/* END CONTENT SECTION */}
    </div>
  );
}
