import {
  AccessTimeTwoTone,
  AccountCircleTwoTone,
  HomeTwoTone,
  MonetizationOnTwoTone,
  SettingsTwoTone,
} from "@material-ui/icons";
import React from "react";
import styles from "../styles/Layout.module.css";
import SideBarListItem from "./sidebar/SideBarListItem";

export default function SideBar() {
  return (
    <div className={styles.sidebar + " sticky"}>
      <div className="sidebarWrapper p-5 text-gray-600">
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-600">
            Dashboard
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem icon={HomeTwoTone} name="Analytics" />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-600">
            Management
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem icon={AccountCircleTwoTone} name="Users" />
            <SideBarListItem icon={AccessTimeTwoTone} name="Timesheet" />
            <SideBarListItem icon={SettingsTwoTone} name="Project Management" />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-600">
            Records
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem icon={MonetizationOnTwoTone} name="Expenses" />
          </ul>
        </div>
      </div>
    </div>
  );
}
