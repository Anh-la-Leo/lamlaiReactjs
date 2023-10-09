import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./paginate";
import queryString from "query-string";
import { calculatePaginationRange } from "./utils.js";
import { useNavigate } from "react-router-dom";

export const TableLoai = (props) => {
  const [provinces, setProvinces] = useState([]);
  const reanderData = localStorage.getItem("getDangNhap");
  const [searchResults, setSearchResults] = useState([]);

  const Url = "https://wlp.howizbiz.com";
  const navigate = useNavigate();
  const [TotalLoai, setTotalLoai] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 363,
  });
  const [filters, setFilter] = useState({
    paginate: true,
    page: 1,
    perpage: 10,
  });
  const [itemToDelete, setItemToDelete] = useState(null);
  const [searchPage, setSearchPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramString = queryString.stringify(filters);
        const response = await axios.get(
          `https://wlp.howizbiz.com/api/species?${paramString}&with=roles,createdBy&inactive=-1`,
          {
            headers: {
              Authorization: `Bearer ${reanderData}`,
            },
          }
        );
        const { list, pagination } = response.data;

        // Áp dụng tìm kiếm dựa trên nội dung nhập vào ô input
        const filteredList = list.filter((province) =>
          province.ten.toLowerCase().includes(props.searchInput.toLowerCase())
        );

        setProvinces(filteredList);
        setTotalLoai(pagination);
        setSearchResults(filteredList); // Lưu danh sách đã lọc vào state mới
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters, reanderData, props.searchInput, searchPage]); // Thêm searchPage vào dependencies

  function handlePageChange(newPage) {
    setFilter({
      ...filters,
      page: newPage,
    });
  }

  function handlePerPageChange(event) {
    const newPerPage = parseInt(event.target.value, 10);
    setFilter({
      ...filters,
      page: 1,
      perpage: newPerPage,
    });
  }

  const handleDeleteClick = (name, id) => {
    setItemToDelete({ name, id });

    document.getElementById("Delete").classList.add("show");
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    props.handleSearchInputChange(searchTerm);

    // Sau khi cập nhật nội dung tìm kiếm, lọc lại danh sách
    const filteredList = provinces.filter((province) =>
      province.ten.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredList);

    // Reset trang về trang đầu tiên khi thay đổi nội dung tìm kiếm
    setSearchPage(1);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete && itemToDelete.id) {
      try {
        await axios.delete(
          `https://wlp.howizbiz.com/api/species/${itemToDelete.id}`,
          {
            headers: {
              Authorization: `Bearer ${reanderData}`,
            },
          }
        );

        document.getElementById("Delete").classList.remove("show");
        setFilter({
          ...filters,
          page: 1,
        });
      } catch (error) {
        console.error("Lỗi khi xóa mục:", error);
      }
    }
  };

  const { page, perpage, total } = TotalLoai;
  const { start, end } = calculatePaginationRange(
    searchPage,
    filters.perpage,
    total
  );
  const handleEditClick = () => {
    navigate("/cap-nhat");
  };
  return (
    <div className="main_table">
      <div className="species-action" style={{ display: "none" }}>
        <div className="species-action-search">
          {/* Thanh tìm kiếm */}
          <input
            placeholder="Tìm kiếm theo tên"
            type="text"
            value={props.searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <table className="tableLoai">
        <thead>
          <tr
            className="row"
            style={{ borderBottom: "solid", borderColor: "#bbbbbb" }}
          >
            <td className="col-sm-2">
              <strong>Tên</strong>
            </td>
            <td className="col-sm">
              <strong>Tên khoa học</strong>
            </td>
            <td className="col-sm">
              <strong>Giới</strong>
            </td>
            <td className="col-sm">
              <strong>ngành</strong>
            </td>
            <td className="col-sm">
              <strong>Lớp</strong>
            </td>
            <td className="col-sm">
              <strong>Bộ</strong>
            </td>
            <td className="col-sm">
              <strong>Họ</strong>
            </td>
            <td className="col-sm">
              <strong>Chi</strong>
            </td>
            <td className="col-sm">
              <strong>Hành động</strong>
            </td>
          </tr>
        </thead>
        <tbody id="getUser">
          {searchResults.slice(start - 1, end).map((province) => (
            <tr key={province.id} className="row CallTable">
              <td className="col-sm-2">
                <img
                  src={
                    Url +
                    (province.attachments[0] && province.attachments[0].path
                      ? province.attachments[0].path
                      : "/static/img/favicon.e4ca0e6e.png")
                  }
                  className="card-img-top"
                  alt="..."
                />
                <strong>{province.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.kingdom.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.phylumn.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.class.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.order.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.family.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.genus.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm iconTable" style={{ display: "flex" }}>
                <p
                  onClick={handleEditClick}
                  className="text-danger"
                  style={{ paddingRight: "20px" }}
                >
                  <i className="fa-solid fa-pen" />
                </p>
                <p
                  className="text-danger"
                  data-bs-toggle="modal"
                  onClick={() => handleDeleteClick(province.name, province.id)}
                  data-bs-target="#Delete"
                >
                  <i className="fa-solid fa-trash" />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal" id="Delete">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h4 className="modal-title ">Bạn có chắc chắn không?</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <p>
                Bạn có chắc muốn xóa
                <strong> {itemToDelete && itemToDelete.id} </strong>
                Điều này hoàn toàn không thể hoàn tác!
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
                data-bs-dismiss="modal"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="sc-lbyHcV bMbLTF">
          {start}-{end}/{total}
        </div>
        <div
          className="perPage"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Pagination pagination={TotalLoai} onPageChange={handlePageChange} />
          <div className="items-per-page">
            <select
              id="itemsPerPage"
              value={filters.perpage}
              onChange={handlePerPageChange}
            >
              <option value="5">5 / trang</option>
              <option value="10">10 / trang</option>
              <option value="25">25 / trang</option>
              <option value="50">50 / trang</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
