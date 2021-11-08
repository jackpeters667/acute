import styles from "../../../styles/Users.module.css";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit, Search } from "@mui/icons-material";
import Link from "next/link";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import AddToTable from "../../../components/AddToTable";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
export default function users() {
  const [user, loading, error] = useAuthState(auth);

  const [value, loadings, errors] = useCollection(collection(db, "users"), {
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
        field: "firstName",
        headerName: "First Name",
        width: 200,
      },
      { field: "lastName", headerName: "Last Name", width: 200 },
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

    const handleDelete = async (id: any) => {
      var r = confirm("Delete this user?");
      if (r) {
        const documentRef = doc(db, "users", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      }
    };

    return (
      <div style={{ height: "100%", width: "100%" }}>
        <div className=" mx-10 flex flex-row justify-between w-full">
          <AddToTable path="users/new" />
        </div>

        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
                firstName: row.get("firstName"),
                lastName: row.get("lastName"),
              };
            })}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            pageSize={8}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        )}
      </div>
    );
  }
  router.push("/");
  return null;
}
