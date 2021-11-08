import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
type Params = {
  path: string;
};

export default function AddToTable(path: Params) {
  return (
    <Link href={path.path}>
      <Button variant="outlined" startIcon={<Add />}>
        New
      </Button>
    </Link>
  );
}
