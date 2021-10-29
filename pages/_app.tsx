import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import PageLayout from "../components/layout/PageLayout";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "../styles/Layout.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  const isLoggedIn = true;
  if (isLoggedIn) {
    return (
      <PageLayout>
        <TopBar />
        <div className="flex">
          <SideBar />
          <div className={styles.others + " "}>hello</div>
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
}

export default MyApp;
