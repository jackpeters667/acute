import { HourglassBottom, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../../styles/Users.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
const Details: NextPage = () => {
  const router = useRouter();
  const { id, firstName, lastName, date, started, ended, time } = router.query;
  let fName: string = firstName as string;
  let lName: string = lastName as string;
  let startDate1: string = date as string;
  let started1: string = started as string;
  let ended1: string = ended as string;
  const [first, setFirstName] = useState(firstName);
  const [last, setDepartment] = useState(lastName);
  const [myDate, setStartDate] = useState(date);
  const [timeStarted, setEndDate] = useState(started);
  const [timeEnded, setOwner] = useState(ended);
  const [myIsActive, setIsActive] = useState(false);

  const updateTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (first && last && id && myDate && timeStarted && timeEnded) {
      try {
        const documentRef = doc(db, "timesheet", id.toString());
        await updateDoc(documentRef, {
          firstName: first,
          lastName: last,
          date: myDate,
          started: timeStarted,
          ended: timeEnded,
          time: myIsActive,
        });
        console.log("Document written with ID: ", documentRef.id);
        alert("Task updated");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
  return (
    <>
      <div className="user">
        <div className="userTitleContainer flex items-center justify-between">
          <h1 className="userTitle text-2xl font-bold">Edit Timesheet</h1>
          <Link href="/admin/timesheet/new">
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
                  {firstName}
                </span>
                <span className="userShowFirstName font-light">{lastName}</span>
              </div>
            </div>
            <div className="userShowBottom mt-5">
              <span className="userShowTitle text-base font-semibold text-gray-400">
                Details
              </span>
              <div className="userShowInfo flex items-center mt-5 mb-0 text-gray-600">
                <HourglassBottom className=" text-base" />
                <span className="userShowInfoTitle ml-3">56345</span>
              </div>
              <hr />
              <div className="stats mt-2 flex flex-col">
                <span className="taskName">First Name: {firstName}</span>
                <span className="taskName">Last Name: {lastName}</span>
                <span className="taskName">Date: {date}</span>
                <span className="taskName">Time Started: {started}</span>
                <span className="taskName">Time Ended: {ended}</span>
                <span className="taskName">Time Difference: {time}</span>
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
                    placeholder={fName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Department</label>
                  <input
                    type="text"
                    onChange={(e) => setDepartment(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={lName}
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
                    placeholder={started1}
                  />
                </div>
                <div className="userUpdateItem flex flex-col mt-2">
                  <label className="mb-1 text-sm">Owner</label>
                  <input
                    type="text"
                    onChange={(e) => setOwner(e.target.value)}
                    className="userUpdateInput shadow-sm w-60 text-base"
                    placeholder={ended1}
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
                  <div className="flex flex-row items-center">
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
