import styles from "../../../styles/Users.module.css";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { DeleteOutline, ModeEdit } from "@mui/icons-material";
import Link from "next/link";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

export default function users() {
  const [value, loading, error] = useCollection(collection(db, "expenses"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

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
            <Link
              href={{
                pathname: "expenses/[id]",
                query: {
                  id: params.row.id,
                  name: params.row.name,
                  amount: params.row.amount,
                  date: params.row.date,
                  approved: params.row.approved,
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
    var r = confirm("Delete this expense?");
    if (r) {
      const documentRef = doc(db, "expenses", id.toString());
      await deleteDoc(documentRef);
      console.log("Document written with ID: ", documentRef.id);
    }
  };

  return (
    <div style={{ height: 800, width: "100%" }}>
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
