import React from "react";
import Link from "next/link";
type Params = {
  path: string;
};

export default function AddToTable(path: Params) {
  return (
    <Link href={path.path}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        New
      </button>
    </Link>
  );
}
