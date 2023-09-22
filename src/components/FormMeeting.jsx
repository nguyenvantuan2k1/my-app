import React, { useEffect, useState } from "react";

const regex = /^[a-zA-Z0-9\s]*$/;
const FormMeeting = (props) => {
  const { setDataList, dataList, edit, setEdit, itemEdit, idEdit } = props;

  const [data, setData] = useState(dataList ? dataList : []);
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [content, setContent] = useState("");

  const [errors, setErrors] = useState({
    titleErr: "",
    dayErr: "",
    startTimeErr: "",
    endTimeErr: "",
    contentErr: "",
  });

  useEffect(() => {
    if (edit) {
      setTitle(itemEdit.value);
      setDay(idEdit);
      setStartTime(itemEdit.startTime);
      setEndTime(itemEdit.endTime);
      setContent(itemEdit.content);
    }
  }, itemEdit);

  const [checkForm, setCheckForm] = useState(false);

  const validateForm = () => {
    let checkFormTmp = true;
    let errTmp = { ...errors };
    //check title of form
    if (title === "") {
      errTmp.titleErr = "Title is required";
      checkFormTmp = false;
    } else if (!regex.test(title)) {
      errTmp.titleErr = "Title is invalid";
      checkFormTmp = false;
    } else {
      errTmp.titleErr = "";
    }
    // check date is required and invalid
    if (day === "") {
      errTmp.dayErr = "Day is required";
      checkFormTmp = false;
      setErrors(errTmp);
    } else if (parseInt(day) > 21 || parseInt(day) < 1) {
      errTmp.dayErr = "Date is invalid";
      checkFormTmp = false;
    } else {
      errTmp.dayErr = "";
    }
    // check startTime
    if (startTime === "") {
      errTmp.startTimeErr = "Start time is required";
      checkFormTmp = false;
    } else {
      errTmp.startTimeErr = "";
    }
    // check endTime
    if (Date.parse(endTime) <= Date.parse(startTime)) {
      errTmp.endTimeErr = "end time is less than start time";
      checkFormTmp = false;
    } else if (endTime === "") {
      errTmp.endTimeErr = "end time is required";
      checkFormTmp = false;
    } else {
      errTmp.endTimeErr = "";
    }
    //check contents
    if (content === "") {
      errTmp.contentErr = "Content is required";
      checkFormTmp = false;
    } else if (!regex.test(title)) {
      errTmp.contentErr = "Content is invalid";
      checkFormTmp = false;
    } else {
      errTmp.contentErr = "";
    }

    setCheckForm(checkFormTmp);
    setErrors(errTmp);
    return checkFormTmp;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (edit) {
        console.log("update complete");
        setEdit(false);
        resetForm();
      } else {
        let dataTmp = data.find((e) => day.toString() == e.id);

        dataTmp?.title.push({
          index: dataTmp?.title.length,
          value: title,
          startTime: startTime,
          endTime: endTime,
          content: content,
        });

        let dataIndex = data.findIndex((e) => day.toString() == e.id);

        data[dataIndex] = dataTmp;

        let dataListTmp = { ...data };
        dataListTmp[dataIndex] = dataTmp;
        setDataList(dataListTmp);
      }
    }

    return;
  };
  function resetForm() {
    setTitle("");
    setContent("");
    setEndTime("");
    setStartTime("");
    setDay("");
    setCheckForm(true);
    setErrors({
      titleErr: "",
      dayErr: "",
      startTimeErr: "",
      endTimeErr: "",
      contentErr: "",
    });
  }
  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div
      //   className="container"
      style={{ backgroundColor: "#ffffff", marginTop: 10 }}
    >
      <div className="card" style={{ padding: 20 }}>
        <span>
          <h2>MEETING INFORMATION</h2>
        </span>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <label>Title</label>
                <label className="error">{errors.titleErr}</label>
              </span>
              <input
                name="name"
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <label>Day</label>
                <label className="error">{errors.dayErr}</label>
              </span>
              <input
                name="name"
                className="form-control"
                type="number"
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <label>Start Time</label>
                <label className="error">{errors.startTimeErr}</label>
              </span>

              <input
                name="name"
                type="time"
                className="form-control"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </div>
            <div className="col">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <label>End Time</label>
                <label className="error">{errors.endTimeErr}</label>
              </span>
              <input
                name="name"
                className="form-control"
                type="time"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <label>Content</label>
                <label className="error">{errors.contentErr}</label>
              </span>
              <input
                name="name"
                className="form-control"
                type="text"
                style={{ height: "100px" }}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <span style={{ display: "flex", justifyContent: "end" }}>
                <button
                  className="btn btn-success"
                  style={{ color: "#ffffff", margin: 5 }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                {edit ? (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ color: "#ffffff", margin: 5 }}
                    >
                      Update
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ color: "#ffffff", margin: 5 }}
                    >
                      Create
                    </button>
                  </>
                )}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormMeeting;
