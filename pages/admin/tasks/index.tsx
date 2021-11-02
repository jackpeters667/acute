import { ModeEdit, DeleteOutline } from "@mui/icons-material";
import Link from "next/link";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { NextPage } from "next";
import React, { useState } from "react";

const Tasks: NextPage = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      task: "Chore 1",
      department: "Hello",
      startDate: "World",
      endDate: "Hello",
      owner: "Me",
      status: "active",
    },
    {
      id: 2,
      task: "Chore 1",

      department: "DataGridPro",
      startDate: "is Awesome",
      endDate: "Hello",
      owner: "Me",
      status: "active",
    },
    {
      id: 3,
      task: "Chore 1",
      department: "MUI",
      startDate: "is Amazing",
      endDate: "Hello",
      owner: "Me",
      status: "active",
    },
  ];
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
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: {
        row: { id: any; firstName: string; lastName: string };
      }) => {
        return (
          <div className="cursor-pointer p-2">
            {/* change id number to be from array */}
            {/*Or below works */}
            {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
            <Link
              href={{
                pathname: "users/[id]",
                query: {
                  id: params.row.id,
                  firstName: params.row.firstName,
                  lastName: params.row.lastName,
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
  const [data, setData] = useState(rows);
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        pageSize={8}
      />
    </div>
  );
};
export default Tasks;
function handleDelete(id: any): void {
  throw new Error("Function not implemented.");
}
