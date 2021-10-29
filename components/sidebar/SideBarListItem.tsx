import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
type Entry = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name: String;
};
export default function SideBarListItem(props: Entry) {
  return (
    <li className="text-gray-800 cursor-pointer p-1 flex items-center rounded-xl hover:bg-gray-100">
      <props.icon className="mr-1 text-xl" />
      {props.name}
    </li>
  );
}
