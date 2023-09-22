import React, { useEffect, useState } from "react";
import "./App.css";
import FormMeeting from "./components/FormMeeting";
import data from "./json/data.json";
import ToDo from "./components/ToDo";

function App() {
  const [dataList, setDataList] = useState(data);

  const [itemEdit, setItemEdit] = useState();
  const [idEdit, setIdEdit] = useState();

  const [edit, setEdit] = useState(false);

  const toDoList = [0, 1, 2].map((e, i) => {
    const tmp = [1, 2, 3, 4, 5, 6, 7].map((k, v) => {
      return (
        <>
          <ToDo
            index={e * 7 + k}
            dataList={dataList}
            setItemEdit={setItemEdit}
            setIdEdit={setIdEdit}
            setEdit={setEdit}
          ></ToDo>
        </>
      );
    });
    return (
      <>
        <div
          className="row"
          style={{
            justifyContent: "center",
            // height: "120px",
            minHeight: "120px",
          }}
        >
          {tmp}
        </div>
      </>
    );
  });

  return (
    <>
      <div className="container">
        <FormMeeting
          setDataList={setDataList}
          dataList={dataList}
          edit={edit}
          setEdit={setEdit}
          itemEdit={itemEdit}
          idEdit={idEdit}
        ></FormMeeting>
        <hr></hr>
        <h2>CALENDAR</h2>
        <div
          className="row container-fluid"
          style={{
            textAlign: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div className="col" style={{ border: "1px solid blue" }}>
            Monday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Tuesday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Wednesday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Thursday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Friday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Saturday
          </div>
          <div className="col" style={{ border: "1px solid blue" }}>
            Sunday
          </div>
        </div>

        <div className="container-fluid mt-4 mb-4">
          <div className="row">{toDoList}</div>
        </div>
      </div>
    </>
  );
}

export default App;
