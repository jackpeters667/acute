import { ModeEdit, DeleteOutline } from "@mui/icons-material";
import Link from "next/link";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import AddToTable from "../../../components/AddToTable";

const Tasks: NextPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [value, loadings, errors] = useCollection(collection(db, "tasks"), {
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
      {
        field: "task",
        headerName: "Task",
        width: 200,
      },
      { field: "department", headerName: "Department", width: 200 },
      { field: "startDate", headerName: "End Date", width: 200 },
      { field: "endDate", headerName: "Start Date", width: 200 },
      { field: "owner", headerName: "Project Owner", width: 200 },
      { field: "isActive", headerName: "Is Active", width: 200 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params: {
          row: {
            id: any;
            task: string;
            department: string;
            startDate: any;
            endDate: any;
            owner: string;
            isActive: boolean;
          };
        }) => {
          return (
            <div className="cursor-pointer p-2">
              {/* change id number to be from array */}
              {/*Or below works */}
              {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
              <Link
                href={{
                  pathname: "tasks/[id]",
                  query: {
                    id: params.row.id,
                    task: params.row.task,
                    department: params.row.department,
                    startDate: params.row.startDate,
                    endDate: params.row.endDate,
                    owner: params.row.owner,
                    isActive: params.row.isActive,
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
      var r = confirm("Delete this task?");
      if (r) {
        const documentRef = doc(db, "tasks", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      }
    };

    return (
      <div style={{ height: 300, width: "100%" }}>
        <AddToTable path="tasks/new" />
        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
                task: row.get("task"),
                owner: row.get("owner"),
                department: row.get("department"),
                startDate: row.get("startDate"),
                endDate: row.get("endDate"),
                isActive: row.get("isActive"),
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
export default Tasks;
