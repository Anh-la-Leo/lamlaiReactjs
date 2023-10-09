import React from "react";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { page, itemsPerPage, total } = pagination;
  const totalPages = Math.ceil(total / itemsPerPage);

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage.selected + 1);
    }
  }

  return (
    <div
      className="pagination-container"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <button
        className="pagination-button"
        disabled={page <= 1}
        onClick={() => handlePageChange({ selected: page - 2 })}
        style={{ color: "blue" }}
      >
        <i className="fa-solid fa-caret-left" />
      </button>

      <ul className="pagination-list">
        <ReactPaginate
          previousLabel=""
          nextLabel=""
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </ul>

      <button
        className="pagination-button"
        disabled={page >= totalPages}
        onClick={() => handlePageChange({ selected: page })}
        style={{ color: "blue" }}
      >
        <i className="fa-solid fa-caret-right" />
      </button>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

export default Pagination;
