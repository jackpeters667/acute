import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { auth, db } from "../../../config/firebase";
import router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function New() {
  const [task, setTask] = useState("");
  const [department, setDepartment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [owner, setOwner] = useState("");
  const [isActive, setIsActive] = useState(false);

  const createTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (task && department && startDate && endDate && owner) {
      try {
        const docRef = await addDoc(collection(db, "tasks"), {
          task: task,
          department: department,
          startDate: startDate,
          endDate: endDate,
          owner: owner,
          isActive: isActive,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setTask("");
        setDepartment("");
        alert("Task created");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div>
        <div className="newUserTitle text-2xl font-bold">New Task</div>
        <form
          className="userUpdateForm flex justify-between mt-5"
          onSubmit={createTask}
        >
          <div className="userUpdateLeft">
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Task Name</label>
              <input
                type="text"
                className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                placeholder="Task Name"
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Department</label>
              <input
                type="text"
                className="userUpdateInput shadow-sm w-60 text-base"
                placeholder="Department Name"
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Start Date</label>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                className="userUpdateInput shadow-sm w-60 text-base"
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">End Date</label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                className="userUpdateInput shadow-sm w-60 text-base"
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Owner</label>
              <input
                type="text"
                onChange={(e) => setOwner(e.target.value)}
                className="userUpdateInput shadow-sm w-60 text-base"
                placeholder="New user"
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Is Active</label>
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="yes"
                  name="active"
                  value="Yes"
                  onClick={(e) => setIsActive(true)}
                />
                <label htmlFor="yes">Yes</label>
              </div>

              <div className="flex flex-row items-center mt-2">
                <input
                  type="radio"
                  id="no"
                  name="active"
                  value="No"
                  onClick={(e) => setIsActive(false)}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
  router.push("/");
  return null;
}
