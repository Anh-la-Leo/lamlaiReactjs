import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedId] = useState(false);
  const [userErr, setUserErr] = useState(false);
  const [passErr, setPassErr] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi trang được tải lại
    const renderData = localStorage.getItem("getDangNhap");
    if (renderData) {
      setLoggedId(true);
    } else {
      setLoggedId(false);
    }
  }, []);

  const handleLogin = async () => {
    if (!username) {
      setUserErr(true);
    } else {
      setUserErr(false);
    }

    if (!password) {
      setPassErr(true);
    } else {
      setPassErr(false);
    }

    try {
      const response = await axios.post(
        "https://wlp.howizbiz.com/api/web-authenticate",
        {
          username: username,
          password: password,
        }
      );
      if (response.status === 200) {
        setLoggedId(true);
        const xhttp = response.data.access_token;
        localStorage.setItem("getDangNhap", xhttp);
        navigate("/Loai");
      } else {
        console.log("Đăng nhập thất bại");
        setLoggedId(false);
      }
    } catch (error) {
      console.error("loi dang nhap", error);
      setLoggedId(false);
    }
  };
  return (
    <div className="Login">
      <div className="header_login">
        <img src="https://wlp.howizbiz.com/static/img/logo.png" height="70px" />
        <h2>
          HỆ THỐNG BẢO VỆ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN BẢO
          VỆ
        </h2>
      </div>
      <div className="main_login">
        <form className="DMFrom">
          <div className="from_card">
            <div className="fullForm">
              <div className="Done_set">
                <img
                  src="https://wlp.howizbiz.com/static/img/logo.png"
                  alt=""
                  height={120}
                />
                <h3>Đăng nhập</h3>
              </div>

              <div className="input radius-button">
                <input
                  autoComplete="username"
                  id="value-A_Z"
                  placeholder="Tên đăng nhập"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {userErr && (
                  <div className="error">
                    Trường tên đăng nhập không được bỏ trống.
                  </div>
                )}
              </div>
              <div className="input radius-button">
                <input
                  autoComplete="current-password"
                  id="value-A_Z_09"
                  placeholder="Mật khẩu"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passErr && (
                  <div className="error">
                    Trường mật khẩu không được bỏ trống.
                  </div>
                )}
              </div>
              <div className="SetDN">
                <button type="button" className="setUp" onClick={handleLogin}>
                  Đăng nhập
                </button>
              </div>
              <div className="QuenMK">Quên mật khẩu</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
