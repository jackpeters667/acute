import React from "react";
import { Logout, NotificationsNone, Settings } from "@mui/icons-material";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import router from "next/router";

export default function TopBar() {
  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        alert(error);
        router.push("/");
      });
  };
  return (
    <div className="topbar w-full bg-white h-12 sticky top-0 z-50">
      <div className="tobarWrapper h-full px-5 py-0 flex items-center justify-between">
        <div className="topLeft">
          <span className="logo font-bold text-3xl text-blue-800">Acute Catering & Projects</span>
        </div>
        <div className="topRight flex items-center">
          {/* <div className="topBarIconsContainer relative cursor-pointer  mr-3 text-gray-600">
            <NotificationsNone />
            <span className="topIconBadge absolute -top-1 right-1 bg-blue-600 text-white rounded-xl font-bold text-xs ">
              2
            </span>
          </div> */}
          <div
            className="topBarIconsContainer relative cursor-pointer  mr-3 text-gray-600"
            onClick={logout}
          >
            <Logout />
          </div>
          <img
            src="https://wallpaperaccess.com/full/2213424.jpg"
            alt=""
            className="topAvatar w-10 h-10 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
