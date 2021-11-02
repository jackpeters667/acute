import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import PageLayout from "../components/layout/PageLayout";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import styles from "../styles/Layout.module.css";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  useEffect(() => {
    if (!user) {
      return () => {
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>;
      };
    }
  }, [user, loading]);

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

export default MyApp;
