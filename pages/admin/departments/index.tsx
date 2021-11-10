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
import DialogNewDepartment from "../../../components/departments/DialogNewDepartment";
import DialogEditDepartment from "../../../components/departments/DialogEditDepartment";
import { useState } from "react";
export default function users() {
  const [editDepartment, setEditDepartment] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentID, setDepartmentID] = useState("");
  const [value, loadings, errors] = useCollection(
    collection(db, "departments"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
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
      { field: "department", headerName: "Department", width: 200 },
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params: {
          row: {
            id: any;
            departmentName: string;
          };
        }) => {
          return (
            <div className="cursor-pointer p-2 flex flex-row items-center">
              {/* change id number to be from array */}
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
      confirmDialog("Do you want to delete this department?", async () => {
        const documentRef = doc(db, "departments", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      });
    };

    const showOpenDialog = (row: { id: any; departmentName: string }): void => {
      let department: Department = {
        department: row.id,
        departmentName: row.departmentName,
      };
      setDepartmentName(department.departmentName);
      setDepartmentID(department.department);
      setEditDepartment(true);
    };

    return (
      <div style={{ height: "80%", width: "100%" }}>
        <PageHeader path="departments/new" text="Departments" />
        <div className="mx-10 mb-6">
          <DialogNewDepartment />
          <DialogEditDepartment
            departmentName={departmentName}
            department_id={departmentID}
            dialogState={setEditDepartment}
            dialogOpen={false}
          />
        </div>
        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
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
