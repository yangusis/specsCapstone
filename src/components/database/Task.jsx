import "./Task.css";
import React, { useRef, useState, useEffect } from "react";
import Card from "../UI/Card";

const Task = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [submitIsHovered, setSubmitIsHovered] = useState(false);

  const inputRef = useRef(null);

  const editToggle = () => {
    setIsEditable(!isEditable);
  };

  //? Used to force user to only edit a single thing at a time to avoid Update issues,
  //? otherwise would have to move all Firestore functions in here
  //* I hate this part so much. It originally worked, then broke. Crazy how simple things take so many hours.
  useEffect(() => {
    if (isEditable) {
      inputRef.current.focus();
    }
  }, [isEditable]);

  return (
    <Card styleName="task">
      <h1 className="taskName">{props.name}</h1>
      <div className="taskButtons">
        <button className="deleteBtn" onClick={props.deleteBtn}>
          {props.deleteLabel}
        </button>
        {!isEditable ? (
          <button
            className="editBtn"
            onClick={() => {
              editToggle();
            }}
          >
            {props.editLabel}
          </button>
        ) : (
          <div>
            <input
              className="taskInput"
              ref={inputRef}
              onBlur={() => {
                !submitIsHovered && editToggle();
              }}
              onChange={props.editChange}
            ></input>
            <button
              className="taskChangeBtn"
              onMouseEnter={() => setSubmitIsHovered(true)}
              onMouseLeave={() => setSubmitIsHovered(false)}
              onClick={() => {
                props.editSubmit();
                editToggle();
              }}
            >
              {props.changeLabel}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Task;
