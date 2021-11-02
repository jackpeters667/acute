import { NextPage } from "next";
import React from "react";
import styles from "../../../styles/Users.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";

const Timesheet: NextPage = () => {
  const rows: GridRowsProp = [
    {
      id: 1,
      firstName: "Hello",
      lastName: "World",
      date: "12/12/2012",
      started: "08:00",
      ended: "17:00",
      time: "9",
    },
    {
      id: 2,
      firstName: "DataGridPro",
      lastName: "is Awesome",
      date: "12/12/2012",
      started: "08:00",
      ended: "17:00",
      time: "9",
    },
    {
      id: 3,
      firstName: "MUI",
      lastName: "is Amazing",
      date: "12/12/2012",
      started: "08:00",
      ended: "17:00",
      time: "9",
    },
  ];

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "started", headerName: "Started", width: 200 },
    { field: "ended", headerName: "Ended", width: 200 },
    { field: "time", headerName: "Difference", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cursor-pointer p-2">
            {/* change id number to be from array */}
            {/*Or below works */}
            {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
            <Link
              href={{
                pathname: "timesheet/[id]",
                query: { id: "random", comment: "content" },
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

  const handleDelete = (id: any) => {
    try {
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
export default Timesheet;
