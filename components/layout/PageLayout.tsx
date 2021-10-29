import CustomHead from "./CustomHead";

function PageLayout({ children }: any) {
  return (
    <div className=" overflow-x-hidden">
      <CustomHead />
      <div className="pt-11">{children}</div>
    </div>
  );
}

export default PageLayout;
