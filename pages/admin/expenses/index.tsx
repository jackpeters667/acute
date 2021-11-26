import styles from "../../../styles/Users.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";
import PageHeader from "../../../components/PageHeader";
import { confirmDialog } from "../../../components/ConfirmDialog";
import DialogNewExpense from "../../../components/expenses/DialogNewExpense";
import { useState } from "react";


export default function expenses() {
  const [editExpense, setEditExpense] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [expenseToEdit, setExpenseToEdit] = useState<any>(null);
  const [value, loadings, errors] = useCollection(collection(db, "expenses"), {
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
        field: "name",
        headerName: "Expense",
        width: 200,
      },
      { field: "amount", headerName: "Amount", width: 200 },
      { field: "date", headerName: "Date", width: 200 },
      { field: "approved", headerName: "Approved?", width: 200 },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params: {
          row: {
            id: any;
            name: string;
            amount: string;
            date: string;
            approved: string;
          };
        }) => {
          return (
            <div className="cursor-pointer p-2">
              {/* change id number to be from array */}
              {/*Or below works */}
              {/* <Link href={`/admin/users/${encodeURIComponent("id")}`}> </Link> */}
               <div
                //   href={{
                //    pathname: "expenses/[id]",
                //    query: {
                //      id: params.row.id,
                //      name: params.row.name,
                //      amount: params.row.amount,
                //     date: params.row.date,
               //       approved: params.row.approved,
               //     },
                //    }}
                > 
                <ModeEdit onClick={() => showOpenDialog(params.row.id)} />
              </div>

              <DeleteOutline onClick={() => handleDelete(params.row.id)} />
            </div>
          );
        },
      },
    ];

    const handleDelete = async (id: any) => {
      confirmDialog("Do you want to delete this expense?", async () => {
        const documentRef = doc(db, "expenses", id.toString());
        await deleteDoc(documentRef);
        console.log("Document written with ID: ", documentRef.id);
      });
    };

    const showOpenDialog = (row: {
      id: any;
       Name: string;
       Amount: string;
       Date: any | undefined;
       Approved?: string;
    
    }): void => {
      let expense: Expense = {
        id: row.id,
        Name: row.Name,
        Amount: row.Amount,
        Date: row.Date,
        Approved: row.Approved
      }; 
    
      setExpenseToEdit(expense);
      setEditExpense(true);
    };

    return (
      <div style={{ height: 800, width: "100%" }}>
        <PageHeader path="expenses/new" text="Expenses" />
        <div className="mx-10 mb-6">
          <DialogNewExpense />
        </div>
       
        {value && (
          <DataGrid
            rows={value.docs.map((row) => {
              return {
                id: row.id,
                name: row.get("name"),
                amount: row.get("amount"),
                date: row.get("date"),
                approved: row.get("approved"),
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
}
