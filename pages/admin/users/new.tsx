import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db, auth } from "../../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import router from "next/router";

export default function New() {
  const [fName, setFName] = useState("");
  const [lName, setLname] = useState("");
  const createUser = async (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (fName.length > 0 && lName.length > 0) {
      try {
        const docRef = await addDoc(collection(db, "users"), {
          firstName: fName,
          lastName: lName,
          created: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
        setFName("");
        setLname("");
        alert("User created");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      alert("Please check your entries");
    }
  };
  const [user, loading, error] = useAuthState(auth);
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
        <div className="newUserTitle">New User</div>
        <form
          className="userUpdateForm flex justify-between mt-5"
          onSubmit={createUser}
        >
          <div className="userUpdateLeft">
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">First Name</label>
              <input
                type="text"
                className="userUpdateInput text-base shadow-sm w-60 border-none border-b-2 border-gray-600 h-7"
                placeholder="first name"
                onChange={(e) => setFName(e.target.value)}
              />
            </div>
            <div className="userUpdateItem flex flex-col mt-2">
              <label className="mb-1 text-sm">Last Name</label>
              <input
                type="text"
                className="userUpdateInput shadow-sm w-60 text-base"
                placeholder="last name"
                onChange={(e) => setLname(e.target.value)}
              />
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
