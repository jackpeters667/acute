import styles from "../../../styles/Users.module.css";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit, Search } from "@mui/icons-material";
import Link from "next/link";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import PageHeader from "../../../components/PageHeader";
import { confirmDialog } from "../../../components/ConfirmDialog";
import DialogNewUser from "../../../components/users/DialogNewUser";
import DialogEditUser from "../../../components/users/DialogEditUser";
import { useState } from "react";

export default function users() {
  const [editUser, setEditUser] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [userToEdit, setUserToEdit] = useState<any>(null);
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
      { field: "emailAddress", headerName: "Email", width: 200 },
      { field: "phoneNumber", headerName: "Phone", width: 200 },
      { field: "department", headerName: "Department", width: 200 },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params: {
          row: {
            id: any;
            firstName: string;
            lastName: string;
            emailAddress: string | undefined;
            phoneNumber: string;
            department: string;
            departmentName: string;
          };
        }) => {
          return (
            <div className="cursor-pointer p-2 flex flex-row items-center">
              {/* change id number to be fuserrom array */}
              {/*Or below works */}
              {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
              <div
              // href={{
              //   pathname: "users/[id]",
              //   query: {
              //     id: params.row.id,
              //     firstName: params.row.firstName,
              //     lastName: params.row.lastName,
              //   },
              // }}
              >
                <ModeEdit onClick={() => showOpenDialog(params.row)} />
              </div>

              <DeleteOutline onClick={() => handleDelete(params.row.id)} />
            </div>
          );
        },
      },
    ];

    const handleDelete = async (id: any) => {
      confirmDialog("Do you want to delete this user?", async () => {
        const documentRef = doc(db, "users", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      });
    };

    const showOpenDialog = (row: {
      id: any;
      firstName: string;
      lastName: string;
      emailAddress: string | undefined;
      phoneNumber: string;
      department: string;
      departmentName: string;
    }): void => {
      let user: User = {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        department: row.department,
        departmentName: row.departmentName,
        emailAddress: row.emailAddress,
        phoneNumber: row.phoneNumber,
      };
      setUserToEdit(user);
      setEditUser(true);
    };

    return (
      <div style={{ height: "80%", width: "100%" }}>
        <PageHeader path="users/new" text="Worker" />
        <div className="mx-10 mb-6">
          <DialogNewUser />
          {/* <DialogEditUser
            user={userToEdit}
            dialogState={setEditUser}
            dialogOpen={editUser}
          /> */}
        </div>
        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
                firstName: row.get("firstName"),
                lastName: row.get("lastName"),
                emailAddress: row.get("emailAddress"),
                phoneNumber: row.get("phoneNumber"),
                department: row.get("departmentName"),
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