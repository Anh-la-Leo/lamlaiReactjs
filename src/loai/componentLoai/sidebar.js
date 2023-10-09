import React from "react";
export const Sidebar = () => {
  return (
    <div
      className="d-flex Sidebar"
      style={{ paddingRight: "20px", width: "15%" }}
    >
      <div className="sidebar_content ps-2 pe-2 mt-3">
        <p className="sidebar_item mb-2 d-flex">
          <i
            className="fa-solid fa-table-columns"
            style={{ paddingRight: "10px" }}
          />
          <div className="item_title">Bảng điều khiển</div>
        </p>
        <p className="sidebar_item mb-2 d-flex ">
          <i className="fa-solid fa-user" style={{ paddingRight: "10px" }} />
          <div className="item_title"> Quản lý người dùng </div>
        </p>
        <p className="sidebar_item mb-2 d-flex">
          <i
            className="fa-solid fa-chart-line"
            style={{ paddingRight: "10px" }}
          />
          <div className="item_title">Phân loại học </div>
        </p>
        <p className="sidebar_item mb-2 d-flex content_active">
          <i className="fa-solid fa-paw" style={{ paddingRight: "10px" }} />
          <div className="item_title">Loài nguy cấp quý hiếm </div>
        </p>
        <p className="sidebar_item mb-2 d-flex">
          <i className="fa-solid fa-pen" style={{ paddingRight: "10px" }} />
          <div className="item_title">Bài viết</div>
        </p>
        <p className="sidebar_item mb-2 d-flex">
          <i className="fa-solid fa-receipt" style={{ paddingRight: "10px" }} />
          <div className="item_title">Phiếu điều xuất</div>
        </p>
        <p className="sidebar_item mb-2 d-flex">
          <i className="fa-solid fa-book" style={{ paddingRight: "10px" }} />
          <div className="item_title">Danh mục</div>
        </p>
      </div>
    </div>
  );
};
