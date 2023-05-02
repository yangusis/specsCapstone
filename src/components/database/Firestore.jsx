import "./Firestore.css";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";

export const taskCollectionRef = collection(db, "todo-list");

const Firestore = () => {
  //? GET TASK STATE
  const [tasks, setTasks] = useState([]);
  //? CREATE TASK STATE
  const [newTask, setNewTask] = useState("");
  //? UPDATED TASK STATE
  const [updatedTask, setUpdatedTask] = useState("");

  const getTasks = async () => {
    // Read data
    // Set tasks

    try {
      const data = await getDocs(taskCollectionRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((task) => task.userId === auth?.currentUser?.uid)
        .sort((a, b) => a.order - b.order);

      console.log("LOGGING DB VALUES", filteredData);
      setTasks(filteredData);
      console.log(tasks);
    } catch (err) {
      console.log(err);
    }
  };

  //? Does the initial load of the task list
  useEffect(() => {
    getTasks();
  }, []);

  //^ CHANGE HANDLERS--------------------
  const taskChangeHandler = (evt) => {
    setNewTask(evt.target.value);
  };

  //   const uidHandler = (evt) => {
  //     setUid(evt.target.value);
  //   };
  //^ END OF CHANGE HANDLERS--------------

  const createTask = async () => {
    try {
      await addDoc(taskCollectionRef, {
        task: newTask,
        userId: auth?.currentUser?.uid,
        order: 0,
      });
      setNewTask("");
      console.log("TASK ADDED SUCCESSFULLY");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "todo-list", id);
    await deleteDoc(taskDoc);
    console.log("TASK SUCCESSFULLY DELETED");
    getTasks();
  };

  const updateTask = async (id) => {
    const taskDoc = doc(db, "todo-list", id);
    if (updatedTask.length !== 0) {
      await updateDoc(taskDoc, { task: updatedTask });
      console.log("TASK SUCCESSFULLY UPDATED");
      getTasks();
    } else {
      console.log("TASK NOT UPDATED");
    }

    setUpdatedTask("");
  };

  //! DND Function
  const handleOnDragEnd = async (res) => {
    if (!res.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(res.source.index, 1);
    items.splice(res.destination.index, 0, reorderedItem);

    setTasks(items);

    //? Sorts the task list in the database when you drag and drop WOOO! IT WORKED
    items.forEach(async (task, index) => {
      const taskDoc = doc(db, "todo-list", task.id);
      await updateDoc(taskDoc, { order: index });
    });
  };

  return (
    <div className="dbContainer fade-in">
      <h2 className="fsHeader">TO-DO LIST</h2>
      <div className="form">
        <input
          className="taskInput"
          value={newTask}
          placeholder="Task..."
          onChange={taskChangeHandler}
        />
        <button className="submitBtn" onClick={createTask}>
          Submit Task
        </button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {tasks.length > 0 && (
          <Droppable droppableId={String(tasks.userId)}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task
                          name={task.task}
                          deleteBtn={() => deleteTask(task.id)}
                          deleteLabel="Delete"
                          editLabel="Edit"
                          editChange={(e) => setUpdatedTask(e.target.value)}
                          editSubmit={() => updateTask(task.id)}
                          changeLabel={
                            updatedTask.length === 0 ? "Cancel" : "Submit"
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </div>
  );
};

export default Firestore;
