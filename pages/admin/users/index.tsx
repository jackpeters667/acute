import styles from "../../../styles/Users.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function users() {
  const [value, loading, error] = useCollection(collection(db, "users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const rows: GridRowsProp = [
    { id: 1, firstName: "Hello", lastName: "World" },
    { id: 2, firstName: "DataGridPro", lastName: "is Awesome" },
    { id: 3, firstName: "MUI", lastName: "is Amazing" },
  ];

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
    },
    { field: "lastName", headerName: "Last Name", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: { row: { id: any } }) => {
        return (
          <div className="cursor-pointer p-2">
            {/* change id number to be from array */}
            {/*Or below works */}
            {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
            <Link
              href={{
                pathname: "users/[id]",
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

  const handleDelete = (id: any) => {
    // try {
    //   setData(data.filter((item: { id: any; }) => item.id !== id));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div style={{ height: 800, width: "100%" }}>
      {value && (
        <DataGrid
          rows={value.docs.map((row) => {
            return {
              id: row.id,
              firstName: row.get("firstName"),
              lastName: row.get("lastLastName"),
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