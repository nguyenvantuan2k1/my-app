import React from "react";

const ToDo = (props) => {
  const { index, dataList,setItemEdit,setIdEdit,setEdit } = props;
  const titles = dataList[index - 1].title;

  const handleEdit = (e,index) => {
    setItemEdit(e);
    setIdEdit(index);
    setEdit(true);
  };
  return (
    <div className="col" style={{ border: "1px solid green", height: "100%" }}>
      <h5>Day : {dataList[index - 1].id}</h5>
      {titles?.map((e, i) => {
        return (
          <>
            <span
              className="d-flex justify-content-between m-0 p-0"
              style={{ color: "blue" }}
              key={i}
            >
              <p>{e.startTime}</p>
              <p className="text-truncate" style={{ maxWidth: "40px" }}>
                {e.value}
              </p>
              <p>
                <button
                  className="btn btn-success btn-sm me-1"
                  onClick={()=>handleEdit(e,index)}
                >
                  <i className="bi bi-pencil-square "></i>
                </button>
                <button className="btn btn-danger btn-sm">
                  <i className="bi bi-trash3"></i>
                </button>
              </p>
            </span>
          </>
        );
      })}
    </div>
  );
};

export default ToDo;
