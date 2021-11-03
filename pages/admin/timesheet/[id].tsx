import { HourglassBottom, PermIdentity } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../../styles/Users.module.css";
import Link from "next/link";
import { NextPage } from "next";
import { useState } from "react";
import {
  doc,
  getDoc,
  getDocFromCache,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { useAuthState } from "react-firebase-hooks/auth";

const Details: NextPage = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const { id, firstName, lastName, date, started, ended, time } = router.query;
  const docRef = doc(db, "timesheet", id as string);
  const [timeStarted, setStartTime] = useState(started);
  const [timeEnded, setEndTime] = useState(ended);
  const [startArray, setStartArray] = useState([]);

  function parseMillisecondsIntoReadableTime(milliseconds: number) {
    //Get hours from milliseconds
    var hours = milliseconds / (1000 * 60 * 60);
    var absoluteHours = Math.floor(hours);
    var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

    //Get remainder from hours and convert to minutes
    var minutes = (hours - absoluteHours) * 60;
    var absoluteMinutes = Math.floor(minutes);
    var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

    //Get remainder from minutes and convert to seconds
    var seconds = (minutes - absoluteMinutes) * 60;
    var absoluteSeconds = Math.floor(seconds);
    var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

    return h + ":" + m + ":" + s;
  }

  function getTime(params: number) {
    var date = new Date((params as number) * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ":" + minutes.substr(-2);
    return `${formattedTime}`;
  }

  // Get a document, forcing the SDK to fetch from the offline cache.
  async function getCachedDocs() {
    try {
      const doc = await getDocFromCache(docRef);
      // Document was found in the cache. If no cached document exists,
      // an error will be returned to the 'catch' block below.
      console.log("Cached document data:", doc.data());

      setStartTime(getTime(doc.get("started")));
      setEndTime(getTime(doc.get("ended")));
      setStartArray(doc.get("started"));
      console.log("timeStarted", startArray);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }
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
    getCachedDocs();
    const [reEnteredTime, setReenteredTime] = useState();
    const updateTimesheet = async (evt: { preventDefault: () => void }) => {
      evt.preventDefault();
      if (reEnteredTime && id && timeStarted) {
        try {
          const documentRef = doc(db, "timesheet", id.toString());
          const starting = startArray as unknown as Timestamp;
          console.log("timeStarted", startArray);
          var date1 = starting.toDate(); // 9:00 AM
          var date2 = new Date(reEnteredTime); // 5:00 PM
          console.log("date", date2);
          console.log("date", date1);
          var diff = date2.valueOf() - date1.valueOf();
          var readableTime = parseMillisecondsIntoReadableTime(diff);
          console.log(readableTime);
          await updateDoc(documentRef, {
            ended: reEnteredTime,
            time: readableTime,
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
                  <span className="userShowFirstName font-light">
                    {lastName}
                  </span>
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
                  <span className="taskName">Time Started: {timeStarted}</span>
                  <span className="taskName">Time Ended: {timeEnded}</span>
                  <span className="taskName">Time Difference: {time}</span>
                </div>
              </div>
            </div>
            <div className={styles.userUpdate + " shadow-2xl p-5 ml-5"}>
              <span className="userUpdateTitle text-2xl font-semibold">
                Edit
              </span>
              <form
                className="userUpdateForm flex justify-between mt-5"
                onSubmit={updateTimesheet}
              >
                <div className="userUpdateLeft">
                  <div className="userUpdateItem flex flex-col mt-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label="Time Ended"
                        value={reEnteredTime}
                        onChange={(newValue: any) => {
                          setReenteredTime(newValue);
                        }}
                        renderInput={(params: any) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
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
  }
  router.push("/");
  return null;
};

export default Details;
