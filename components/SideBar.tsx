import { Done, Home } from "@material-ui/icons";
import React from "react";
import styles from "../styles/Layout.module.css";
import SideBarListItem from "./sidebar/SideBarListItem";

export default function SideBar() {
  return (
    <div className={styles.sidebar + " "}>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <SideBarListItem icon={Home} name="Home" />
            <li className="text-gray-800">
              <Home />
              Home
            </li>
            <li className="text-gray-800">
              <Home />
              Users
            </li>
            <li className="text-gray-800">
              <Home />
              Timesheets
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
