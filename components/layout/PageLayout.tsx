import SideBar from "../SideBar";
import TopBar from "../TopBar";
import CustomHead from "./CustomHead";
import ConfirmDialog from "../ConfirmDialog";
function PageLayout({ children }: any) {
  return (
    <div className=" overflow-x-hidden">
      <ConfirmDialog />
      <CustomHead />
      <div>{children}</div>
    </div>
  );
}

export default PageLayout;
