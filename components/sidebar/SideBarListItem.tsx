import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { Url } from "url";
type Entry = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name: String;
  path: any;
};
export default function SideBarListItem(props: Entry) {
  return (
    <Link href={props.path}>
      <li className="text-gray-100 cursor-pointer p-1 flex items-center rounded-xl hover:bg-gray-600">
        <props.icon className="mr-1 text-xl" />
        {props.name}
      </li>
    </Link>
  );
}
