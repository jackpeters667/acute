import styles from "../../../styles/Users.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
const rows: GridRowsProp = [
  { id: 1, firstName: "Hello", lastName: "World" },
  { id: 2, firstName: "DataGridPro", lastName: "is Awesome" },
  { id: 3, firstName: "MUI", lastName: "is Amazing" },
];

const columns: GridColDef[] = [
  { field: "firstName", headerName: "First Name", width: 200 },
  { field: "lastName", headerName: "Last Name", width: 200 },
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
              pathname: "users/[id]",
              query: { id: "random", comment: "content" },
            }}
          >
            <ModeEdit />
          </Link>

          <DeleteOutline />
        </div>
      );
    },
  },
];

export default function users() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        pageSize={8}
      />
    </div>
  );
}
