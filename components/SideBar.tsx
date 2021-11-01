import {
  AccessTimeTwoTone,
  AccountCircleTwoTone,
  HomeTwoTone,
  MonetizationOnTwoTone,
  SettingsTwoTone,
} from "@mui/icons-material";
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
            <SideBarListItem
              icon={HomeTwoTone}
              name="Analytics"
              path="/admin/dashboard"
            />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-600">
            Management
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem
              icon={AccountCircleTwoTone}
              name="Users"
              path="/admin/users"
            />
            <SideBarListItem
              icon={AccessTimeTwoTone}
              name="Timesheet"
              path="/dashboard"
            />
            <SideBarListItem
              icon={SettingsTwoTone}
              name="Project Management"
              path="/dashboard"
            />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-600">
            Records
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem
              icon={MonetizationOnTwoTone}
              name="Expenses"
              path="/dashboard"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
