import { HourglassBottom, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../../styles/Users.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { StringLike } from "@firebase/util";

const Details: NextPage = () => {
  const router = useRouter();
  const { id, task, department, startDate, endDate, owner, isActive } =
    router.query;
  let task1: string = task as string;
  let department1: string = department as string;
  let startDate1: string = startDate as string;
  let endDate1: string = endDate as string;
  let owner1: string = owner as string;
  const [myTask, setTask] = useState(task);
  const [myDepartment, setDepartment] = useState(department);
  const [myStartDate, setStartDate] = useState(startDate);
  const [myEndDate, setEndDate] = useState(endDate);
  const [myOwner, setOwner] = useState(owner);
  const [myIsActive, setIsActive] = useState(isActive);

  const updateTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    // if (fName && lName && id) {
    //   try {
    //     const documentRef = doc(db, "users", id.toString());
    //     await updateDoc(documentRef, {
    //       firstName: fName,
    //       lastName: lName,
    //     });
    //     console.log("Document written with ID: ", documentRef.id);
    //     alert("User updated");
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // } else {
    //   alert("Please check your entries");
    // }
  };
  return (
    <>
      <div className="user">
        <div className="userTitleContainer flex items-center justify-between">
          <h1 className="userTitle text-2xl font-bold">Edit Task</h1>
          <Link href="/admin/tasks/new">
            <button className="userAddButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </Link>
        </div>
        <div className="userContainer flex mt-5">
          <div className={styles.userShow + " shadow-2xl p-5"}>
            <div className="userShowTop flex items-center">
              <div className="userShowTopTitle flex flex-col ml-5">
                <span className="userShowSurname font-semibold text-xl">
                  {task}
                </span>
                <span className="userShowFirstName font-light">
                  {department}
                </span>
              </div>
            </div>
            <div className="userShowBottom mt-5">
              <span className="userShowTitle text-base font-semibold text-gray-400">
                Statistics
              </span>
              <div className="userShowInfo flex items-center mt-5 mb-0 text-gray-600">
                <HourglassBottom className=" text-base" />
                <span className="userShowInfoTitle ml-3">56345</span>
              </div>
            </div>
          </div>
          <div className={styles.userUpdate + " shadow-2xl p-5 ml-5"}>
            <span className="userUpdateTitle text-2xl font-semibold">Edit</span>
            <form
              className="userUpdateForm flex justify-between mt-5"
              onSubmit={updateTask}
            >
              <div className="userUpdateLeft">
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Task Name</label>
                  <input
                    type="text"
                    className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                    placeholder={task1}
                    onChange={(e) => setTask(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Department</label>
                  <input
                    type="text"
                    onChange={(e) => setDepartment(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={department1}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Start Date</label>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={startDate1}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">End Date</label>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={endDate1}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Owner</label>
                  <input
                    type="date"
                    onChange={(e) => setOwner(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={owner1}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Is Active</label>
                  <input
                    type="radio"
                    id="yes"
                    name="Yes"
                    value="Yes"
                    onChange={(e) => setIsActive(e.target.value)}
                  />
                  <label htmlFor="yes">Yes</label>
                  <input
                    type="radio"
                    id="no"
                    name="No"
                    value="Yes"
                    onChange={(e) => setIsActive(e.target.value)}
                  />
                  <label htmlFor="no">No</label>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
