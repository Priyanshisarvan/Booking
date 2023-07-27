import React, { useEffect } from "react";
import { HelperFunction } from "../../Helper/Helper";

const Pagination = ({
  totalRooms,
  roomsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalRooms / roomsPerPage); i++) {
    pages.push(i);
  }

  useEffect(() => {
    HelperFunction();
  }, []);

  const increment = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const decrement = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="pagination1">
      <button hidden={currentPage > 1 ? false : true}>
        <i className="bi bi-chevron-left" onClick={decrement}></i>
      </button>

      <h3>{currentPage}</h3>

      <button hidden={currentPage < pages.length ? false : true}>
        <i className="bi bi-chevron-right" onClick={increment}></i>
      </button>
    </div>
  );
};

export default Pagination;
