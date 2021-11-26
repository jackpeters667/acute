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
import AnalyticsIcon from '@mui/icons-material/Analytics';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

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
              icon={AnalyticsIcon}
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
              icon={GroupAddIcon}
              name="Workers"
              path="/admin/users"
            />
            <SideBarListItem
              icon={AccessTimeIcon}
              name="Timesheet"
              path="/admin/timesheet"
            />
            <SideBarListItem
              icon={AssignmentIcon}
              name="Project Management"
              path="/admin/tasks"
            />
            <SideBarListItem
              icon={OtherHousesIcon}
              name="Departments"
              path="/admin/departments"
            />
          </ul>
        </div>
        <div className="sidebarMenu mb-3">
          <h3 className="sidebarTitle font-bold text-sm text-gray-200">
            Records
          </h3>
          <ul className="sidebarList p-1">
            <SideBarListItem
              icon={MonetizationOnIcon}
              name="Expenses"
              path="/admin/expenses"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
