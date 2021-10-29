import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
type Entry = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  name: String;
};
export default function SideBarListItem(props: Entry) {
  return (
    <li className="text-gray-800">
      <props.icon />
      {props.name}
    </li>
  );
}
