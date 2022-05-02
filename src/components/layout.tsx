import { Size, useWindowSize } from "../app/hooks";
import NewsList from "../components/newsList";
import { useRouter } from "next/router";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
  const size: Size = useWindowSize();
  const isMobileView = size.width < 641;
  const router = useRouter();
  const { id } = router.query;

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <div style={{ display: "flex", flex: 1, width: "100%" }}>
        <NewsList hidden={id !== undefined && isMobileView} />
      </div>
      <div style={{ display: "flex", flex: 1 }}>{children}</div>
    </div>
  );
}
