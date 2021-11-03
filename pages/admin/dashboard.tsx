import { MonetizationOn, WatchLater, Work } from "@mui/icons-material";
import React, { useState } from "react";
import FeaturedInfo from "../../components/cards/FeaturedInfo";
import Chart from "../../components/Chart";
import { userData } from "../../data/chartData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import router from "next/router";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

function dashboard() {
  const isToday = (someDate: {
    getDate: () => number;
    getMonth: () => number;
    getFullYear: () => number;
  }) => {
    const today = new Date();
    return (
      someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
    );
  };
  const [user, loading, error] = useAuthState(auth);
  const [expenses, loadings, errors] = useCollection(
    collection(db, "expenses"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  var totalExpenses: number = 0;
  if (expenses) {
    for (let index = 0; index < expenses?.docs.length; index++) {
      if (expenses.docs[index].get("approved")) {
        totalExpenses = (+totalExpenses +
          +expenses.docs[index].get("amount")) as number;
      }
    }
  }
  const [tasks, loadingst, errorst] = useCollection(collection(db, "tasks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  var totalTasks: number = 0;
  if (tasks) {
    for (let index = 0; index < tasks?.docs.length; index++) {
      if (tasks.docs[index].get("isActive")) {
        totalTasks++;
      }
    }
  }

  const [timesheet, loadingsh, errorsh] = useCollection(
    collection(db, "timesheet"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  var totalHours: number = 0;
  if (timesheet) {
    for (let index = 0; index < timesheet.docs.length; index++) {
      const element = timesheet.docs[index];
      const time: string = element.get("time") as string;
      console.log("full:", time);
      var numHours = 0;

      var hours = time.toString().split(":")[0];
      var minutes = time.toString().split(":")[1];
      const numMinutes = +minutes;
      if (numMinutes >= 30) {
        numHours++;
      }
      console.log("hours", hours);
      numHours = numHours + +hours;
      totalHours = totalHours + numHours;
      console.log(totalHours);
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
    return (
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-4xl text-blue-400 tracking-widest font-medium title-font mb-1">
              Welcome
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-white">
              Here are your overall statistics
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 w-full">
            <FeaturedInfo
              icon={MonetizationOn}
              title="Expenses"
              number={("R" + totalExpenses) as unknown as string}
              path="expenses"
            />
            <FeaturedInfo
              icon={Work}
              title="Tasks"
              number={totalTasks as unknown as string}
              path="tasks"
            />
            <FeaturedInfo
              icon={WatchLater}
              title="Hours"
              number={totalHours as unknown as string}
              path="timesheet"
            />
          </div>
        </div>
        <Chart title="Active Users" data={userData} datakey={"Active Users"} />
      </section>
    );
  }
  router.push("/");
  return null;
}

export default dashboard;
