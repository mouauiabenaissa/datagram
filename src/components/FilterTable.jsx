import React from "react";

function FilterTable({ data }) {
  return (
    <div className="container">
      <div className="row">
        <p className="fw-bold display-6">Filter</p>
      </div>
      <div className="row my-3">
        <input
          type="text"
          placeholder="Title ..."
          className="form-control"
        ></input>
      </div>
      <div className="row my-3">
        <input
          type="text"
          placeholder="body ..."
          className="form-control"
        ></input>
      </div>
      <div className="row my-3">
        <p className="fw-bold my-3">Filter by comments:</p>
        <input
          type="text"
          placeholder="name ..."
          className="form-control my-3"
        ></input>

        <input
          type="text"
          placeholder="body ..."
          className="form-control"
        ></input>
      </div>
    </div>
  );
}

export default FilterTable;
