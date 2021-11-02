import { ModeEdit, DeleteOutline } from "@mui/icons-material";
import Link from "next/link";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

const Tasks: NextPage = () => {
  const [value, loading, error] = useCollection(collection(db, "tasks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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

  return (
    <div style={{ height: 300, width: "100%" }}>
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
};
export default Tasks;
function handleDelete(id: any): void {
  throw new Error("Function not implemented.");
}
