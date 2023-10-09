import React, { useState } from "react";
import { TableLoai } from "../MenuLoai/TableLoai";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
export const MainLoai = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleAddNewClick = () => {
    navigate("/them-moi");
  };

  return (
    <div style={{ display: "flex", width: "85%" }}>
      <Sidebar />
      <div className="main_menu ">
        <div className="avatar_loai">
          <button>
            <i className="fa-solid fa-paw" />
          </button>
          <h3>
            <strong>Loài nguy cấp quý hiếm</strong>
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            className="input-search"
            placeholder="Tìm kiếm theo tên"
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <button
            onClick={handleAddNewClick}
            style={{
              height: "36px",
              padding: "0 16px",
              backgroundColor: "#da2a1c",
              border: "none",
              color: "white",
              marginRight: "10px", // Thêm khoảng cách giữa nút và thanh tìm kiếm
            }}
          >
            <strong>+ Thêm mới</strong>
          </button>

          {/* Thanh tìm kiếm */}
        </div>

        <TableLoai
          searchInput={searchInput}
          handleAddNewClick={handleAddNewClick}
        />
      </div>
    </div>
  );
};
