import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import router from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../config/firebase";

export default function New() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isActive, setIsActive] = useState(false);

  const createTask = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (name && amount && date) {
      try {
        const docRef = await addDoc(collection(db, "expenses"), {
          name: name,
          amount: amount,
          approved: isActive,
          date: date,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setName("");
        setAmount("");
        alert("Expense approved");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
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
    return (
      <div>
        <div className="newUserTitle text-2xl font-bold">New Expense</div>
        <form
          className="userUpdateForm flex justify-between mt-5"
          onSubmit={createTask}
        >
          <div className="userUpdateLeft">
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Name</label>
              <input
                type="text"
                className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                placeholder="expense name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Amount</label>
              <input
                type="number"
                className="userUpdateInput shadow-sm w-60 text-base"
                placeholder="amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Date</label>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                className="userUpdateInput shadow-sm w-60 text-base"
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Approved</label>
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  id="yes"
                  name="active"
                  value="Yes"
                  onClick={(e) => setIsActive(true)}
                />
                <label htmlFor="yes">Yes</label>
              </div>

              <div className="flex flex-row items-center mt-2">
                <input
                  type="radio"
                  id="no"
                  name="active"
                  value="No"
                  onClick={(e) => setIsActive(false)}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
  router.push("/");
  return null;
}
