import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HeadersLoai } from "../componentLoai/headerLoai";

const fetchData = async (token, rank) => {
  try {
    const response = await axios.get(
      `https://wlp.howizbiz.com/api/phanloaihoc?ranks[]=${rank}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function AddSpecies() {
  const [listKingdom, setListKingdom] = useState([]);
  const [listPhylum, setListPhylum] = useState([]);
  const [listClass, setListClass] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [listFamily, setListFamily] = useState([]);
  const [listGenus, setListGenus] = useState([]);
  const renderData = localStorage.getItem("getDangNhap");
  const [Ten, setTen] = useState("");
  const [TenKhoaHoc, setTenKhoaHoc] = useState("");
  const [TenTacGia, setTenTacGia] = useState("");
  const [TenDiaPhuong, setTenDiaPhuong] = useState("");
  const [Nguon, setNguon] = useState("");
  const [Kingdom, setKingdom] = useState("");
  const [Phylum, setPhylum] = useState("");
  const [Class, setClass] = useState("");
  const [Order, setOrder] = useState("");
  const [Family, setFamily] = useState("");
  const [Genus, setGenus] = useState("");

  const [TenError, setTenError] = useState("");
  const [TenKhoaHocError, setTenKhoaHocError] = useState("");
  const [KingdomError, setKingdomError] = useState("");
  const [PhylumError, setPhylumError] = useState("");
  const [ClassError, setClassError] = useState("");
  const [OrderError, setOrderError] = useState("");
  const [FamilyError, setFamilyError] = useState("");
  const [GenusError, setGenusError] = useState("");

  const fetchAllData = async () => {
    try {
      if (renderData) {
        const [kingdom, phylum, classData, order, family, genus] =
          await Promise.all([
            fetchData(renderData, "Kingdom"),
            fetchData(renderData, "Phylum"),
            fetchData(renderData, "Class"),
            fetchData(renderData, "Order"),
            fetchData(renderData, "Family"),
            fetchData(renderData, "Genus"),
          ]);
        setListKingdom(kingdom);
        setListPhylum(phylum);
        setListClass(classData);
        setListOrder(order);
        setListFamily(family);
        setListGenus(genus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [renderData]);

  const validateInput = () => {
    setTenError("");
    setTenKhoaHocError("");
    setKingdomError("");
    setPhylumError("");
    setClassError("");
    setOrderError("");
    setFamilyError("");
    setGenusError("");
    let isValid = true;
    if (!Ten) {
      setTenError("Trường tên không được bỏ trống.");
      isValid = false;
    }
    if (!TenKhoaHoc) {
      setTenKhoaHocError("Trường tên khoa học không được bỏ trống.");
      isValid = false;
    }
    if (!Kingdom) {
      setKingdomError("Trường giới không được bỏ trống.");
      isValid = false;
    }
    if (!Phylum) {
      setPhylumError("Trường ngành không được bỏ trống.");
      isValid = false;
    }
    if (!Class) {
      setClassError("Trường lớp không được bỏ trống.");
      isValid = false;
    }
    if (!Order) {
      setOrderError("Trường bộ không được bỏ trống.");
      isValid = false;
    }
    if (!Family) {
      setFamilyError("Trường họ không được bỏ trống.");
      isValid = false;
    }
    if (!Genus) {
      setGenusError("Trường chi không được bỏ trống.");
      isValid = false;
    }
    return isValid;
  };

  const handleAddUser = () => {
    const url = "https://wlp.howizbiz.com/api/species";
    if (!validateInput()) {
      return;
    }
    const newSpecies = {
      ten: Ten,
      ten_khoa_hoc: TenKhoaHoc,
      ten_tac_gia: TenTacGia,
      ten_dia_phuong: TenDiaPhuong,
      nguon_du_lieu: Nguon,
      kingdom_id: parseInt(Kingdom),
      phylum_id: parseInt(Phylum),
      class_id: parseInt(Class),
      order_id: parseInt(Order),
      family_id: parseInt(Family),
      genus_id: parseInt(Genus),
      toa_dos: [],
    };
    axios
      .post(url, newSpecies, {
        headers: {
          Authorization: `Bearer ${renderData}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Thêm mới User thành công!");
        navigate("/loai");
        setTen("");
        setTenKhoaHoc("");
        setTenTacGia("");
        setTenDiaPhuong("");
        setNguon("");
        setKingdom("");
        setPhylum("");
        setClass("");
        setOrder("");
        setFamily("");
        setGenus("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navigate = useNavigate("");
  const handleAddNewClick = () => {
    navigate("/loai");
  };
  return (
    <div>
      <HeadersLoai />
      <hr />
      <div className="MainAdd">
        <div style={{ display: "flex" }}>
          <button className="Button_Back" onClick={handleAddNewClick}>
            <i className="fa-solid fa-arrow-left" />
          </button>
          <h4>
            <b>
              THÔNG TIN VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM CẦN ĐƯỢC ƯU TIÊN
              BẢO VỆ
            </b>
          </h4>
        </div>
        <form>
          <div>
            <p>I. Thông tin chung về loài</p>
            <div
              className="input"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="input-label">
                Tên
                <i className="fa-solid fa-star" style={{ color: "red" }} />
              </label>
              <input
                type="text"
                className="input-field"
                id="Ten_TUser"
                name="ten"
                placeholder="Tên"
                required
                defaultValue={Ten}
                onChange={(e) => setTen(e.target.value)}
              />
              <div style={{ color: "red" }}>{TenError}</div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Tên khoa học
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="Ten_TUser"
                  name="ten_khoa_hoc"
                  placeholder="Tên khoa học"
                  required
                  defaultValue={TenKhoaHoc}
                  onChange={(e) => setTenKhoaHoc(e.target.value)}
                />
                <div style={{ color: "red" }}>{TenKhoaHocError}</div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Tên tác giả
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <input
                  type="text"
                  className="input-field"
                  id="Ten_TUser"
                  name="ten_tac_gia"
                  placeholder="Tên tác giả"
                  required
                  defaultValue={TenTacGia}
                  onChange={(e) => setTenTacGia(e.target.value)}
                />
              </div>
            </div>
            <div
              className="input"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="input-label">
                Tên địa phương
                <i className="fa-solid fa-star" style={{ color: "red" }} />
              </label>
              <input
                type="text"
                className="input-field"
                id="Ten_TUser"
                name="ten_dia_phuong"
                placeholder="Tên địa phương"
                required
                defaultValue={TenDiaPhuong}
                onChange={(e) => setTenDiaPhuong(e.target.value)}
              />
            </div>
            <div
              className="input"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="input-label">
                Nguồn dữ liệu
                <i className="fa-solid fa-star" style={{ color: "red" }} />
              </label>
              <input
                type="text"
                className="input-field"
                id="Ten_TUser"
                name="Ten_T"
                placeholder="Nguồn dữ liệu"
                required
                defaultValue={Nguon}
                onChange={(e) => setNguon(e.target.value)}
              />
            </div>
          </div>
          <div>
            <strong>
              <p style={{ fontSize: "15px" }}>
                II. Phân loại học
                <button
                  style={{
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "red",
                    color: "white",
                    height: "40px",
                    width: "40px",
                    marginLeft: "10px",
                  }}
                >
                  +
                </button>
              </p>
            </strong>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Giới
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="KINGDOM"
                  id="kingdom"
                  defaultValue={Kingdom}
                  onChange={(e) => setKingdom(e.target.value)}
                >
                  <option value=""></option>
                  {listKingdom.map((kingdom) => (
                    <option key={kingdom.id} value={kingdom.uuid}>
                      {kingdom.ten_khoa_hoc}-{kingdom.ten}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{KingdomError}</div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Ngành
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="PHYLUM"
                  id="phylum"
                  defaultValue={Phylum}
                  onChange={(e) => setPhylum(e.target.value)}
                >
                  <option></option>
                  {listPhylum.map((phylum) => (
                    <option key={phylum.id} value={phylum.uuid}>
                      {phylum.ten_khoa_hoc}-{phylum.ten}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{PhylumError}</div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Class
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="CLASS"
                  id="class"
                  defaultValue={Class}
                  onChange={(e) => setClass(e.target.value)}
                >
                  <option></option>
                  {listClass.map((classs) => (
                    <option key={classs.id} value={classs.uuid}>
                      {classs.ten_khoa_hoc}-{classs.ten}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{ClassError}</div>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Bộ
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="ORDER"
                  id="order"
                  defaultValue={Order}
                  onChange={(e) => setOrder(e.target.value)}
                >
                  <option></option>
                  {listOrder.map((order) => (
                    <option key={order.id} value={order.uuid}>
                      {order.ten_khoa_hoc}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{OrderError}</div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Họ
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="FAMILY"
                  id="family"
                  defaultValue={Family}
                  onChange={(e) => setFamily(e.target.value)}
                >
                  <option></option>
                  {listFamily.map((family) => (
                    <option key={family.id} value={family.uuid}>
                      {family.ten_khoa_hoc}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{FamilyError}</div>
              </div>
              <div
                className="input"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "20px",
                  width: "50%",
                }}
              >
                <label className="input-label">
                  Chi
                  <i className="fa-solid fa-star" style={{ color: "red" }} />
                </label>
                <select
                  name="GENUS"
                  id="genus"
                  defaultValue={Genus}
                  onChange={(e) => setGenus(e.target.value)}
                >
                  <option></option>
                  {listGenus.map((genus) => (
                    <option key={genus.id} value={genus.uuid}>
                      {genus.ten_khoa_hoc}
                    </option>
                  ))}
                </select>
                <div style={{ color: "red" }}>{GenusError}</div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn text-success"
              onClick={handleAddUser}
            >
              + Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSpecies;
