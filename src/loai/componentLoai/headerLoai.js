import axios from "axios";
import React, { useState, useEffect } from "react";
export const HeadersLoai = () => {
  const [userData, setUserData] = useState([]);
  const renderData = localStorage.getItem("getDangNhap");
  useEffect(() => {
    if (renderData) {
      axios
        .get("https://wlp.howizbiz.com/api/me", {
          headers: {
            Authorization: `bearer ${renderData}`,
          },
        })
        .then((result) => {
          if (result.data.user) {
            setUserData(result.data.user);
          }
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  });
  return (
    <div className="tasbar">
      <div className="header_left_one">
        <i className="fa-solid fa-bars" />
        <img
          src="https://wlp.howizbiz.com/static/img/logo.png"
          height="40px"
          alt=""
        />
        <h2>
          HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
          BẢO VỆ
        </h2>
      </div>
      <div className="header_left_two">
        <i className="fa-solid fa-bars" />
        <img
          src="https://wlp.howizbiz.com/static/img/logo.png"
          height="40px"
          alt=""
        />
        <h5>HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ,...</h5>
      </div>
      <div className="header_left_three">
        <i className="fa-solid fa-bars" />
        <img
          src="https://wlp.howizbiz.com/static/img/logo.png"
          height="40px"
          alt=""
        />
        <h5>HỆ THỐNG BÁ...</h5>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          {userData && (
            <div className="header_right" id={userData.id}>
              <button className="button_slot">
                {userData.name?.slice(0, 1)}
              </button>
              <br />
              <p
                typeof="button"
                className="rounded-circle"
                data-bs-toggle="modal"
              >
                {" "}
                <strong>{userData.name}</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
