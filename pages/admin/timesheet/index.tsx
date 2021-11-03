import { NextPage } from "next";
import React from "react";
import styles from "../../../styles/Users.module.css";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import AddToTable from "../../../components/AddToTable";

const Timesheet: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  function getTime(params: GridValueFormatterParams) {
    var date = new Date((params.value as number) * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return `${formattedTime}`;
  }
  const [value, loadings, errors] = useCollection(collection(db, "timesheet"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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
    const columns: GridColDef[] = [
      { field: "firstName", headerName: "First Name", width: 200 },
      { field: "lastName", headerName: "Last Name", width: 200 },
      { field: "date", headerName: "Date", width: 200 },
      {
        field: "started",
        headerName: "Started",
        width: 200,
        valueFormatter: getTime,
      },
      {
        field: "ended",
        headerName: "Ended",
        width: 200,
        valueFormatter: getTime,
      },
      { field: "time", headerName: "Difference", width: 200 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params: {
          row: {
            id: any;
            firstName: string;
            lastName: string;
            date: any;
            started: any;
            ended: any;
            time: any;
          };
        }) => {
          return (
            <div className="cursor-pointer p-2">
              {/* change id number to be from array */}
              {/*Or below works */}
              {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
              <Link
                href={{
                  pathname: "timesheet/[id]",
                  query: {
                    id: params.row.id,
                    firstName: params.row.firstName,
                    lastName: params.row.lastName,
                    date: params.row.date,
                    started: params.row.started.seconds,
                    ended: params.row.ended,
                    time: params.row.time,
                  },
                }}
              >
                <ModeEdit />
              </Link>

              <DeleteOutline onClick={() => handleDelete(params.row.id)} />
            </div>
          );
        },
      },
    ];

    const handleDelete = async (id: any) => {
      var r = confirm("Delete this timesheet?");
      if (r) {
        const documentRef = doc(db, "timesheet", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      }
    };

    return (
      <div style={{ height: 300, width: "100%" }}>
        <AddToTable path="timesheet/new" />
        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
                firstName: row.get("firstName"),
                lastName: row.get("lastName"),
                date: row.get("date"),
                started: row.get("started"),
                ended: row.get("ended"),
                time: row.get("time"),
              };
            })}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            pageSize={8}
          />
        )}
      </div>
    );
  }
  router.push("/");
  return null;
};
export default Timesheet;
