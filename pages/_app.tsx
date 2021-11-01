import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import PageLayout from "../components/layout/PageLayout";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "../styles/Layout.module.css";
import { auth } from "../config/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  if (auth.currentUser != null) {
    return (
      <PageLayout>
        <TopBar />
        <div className="flex">
          <SideBar />
          <div className={styles.others + " "}>
            <Component {...pageProps} />
          </div>
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
