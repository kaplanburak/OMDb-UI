import { Outlet } from "react-router";
import { ModeToggle } from "../ui/mode-toggle";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import styles from "./layout.module.scss";

export const Layout = () => {
  const navigate = useNavigate();

  const navigateHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header>
          <h1 onClick={navigateHome}>OMDb Search</h1>
          <ModeToggle />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
