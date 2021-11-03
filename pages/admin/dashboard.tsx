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
  const [user, loading, error] = useAuthState(auth);
  const [value, loadings, errors] = useCollection(collection(db, "expenses"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  var totalExpenses: number = 0;
  if (value) {
    for (let index = 0; index < value?.docs.length; index++) {
      if (value.docs[index].get("approved")) {
        totalExpenses = (+totalExpenses +
          +value.docs[index].get("amount")) as number;
      }
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
              number={totalExpenses as unknown as string}
              path="expenses"
            />
            <FeaturedInfo icon={Work} title="Tasks" number="5" path="tasks" />
            <FeaturedInfo
              icon={WatchLater}
              title="Hours"
              number="41"
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
