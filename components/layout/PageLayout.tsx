import CustomHead from "./CustomHead";

function PageLayout({ children }: any) {
  return (
    <div className=" overflow-x-hidden">
      <CustomHead />
      <div>{children}</div>
    </div>
  );
}

export default PageLayout;
