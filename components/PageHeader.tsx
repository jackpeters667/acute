import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
type Params = {
  path: string;
  text: string;
};

export default function PageHeader(page: Params) {
  return (
    <div className="mx-10">
      <h1 className="text-3xl leading-normal text-gray-900 font-bold mt-2">
        {page.text}
      </h1>
      <hr />
      <br />
    </div>
  );
}
