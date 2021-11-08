import {
  AccessTimeTwoTone,
  AccountCircleTwoTone,
  HomeTwoTone,
  MonetizationOnTwoTone,
  SettingsTwoTone,
  Work,
  WorkOutline,
} from "@mui/icons-material";
import React from "react";
import styles from "../styles/Layout.module.css";
import SideBarListItem from "./sidebar/SideBarListItem";

export default function SideBar() {
  return (
    <div className={styles.sidebar + " sticky bg-gray-900"}>
      <div className="sidebarWrapper p-5 text-gray-200 bg-gray-900">
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-200">
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
          <h3 className="sidebarTitle font-bold text-sm text-gray-200">
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
              path="/admin/timesheet"
            />
            <SideBarListItem
              icon={SettingsTwoTone}
              name="Project Management"
              path="/admin/tasks"
            />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-200">
            Records
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem
              icon={MonetizationOnTwoTone}
              name="Expenses"
              path="/admin/expenses"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
