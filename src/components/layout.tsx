import { Size, useWindowSize } from "../app/hooks";
import NewsList from "../components/newsList";

export default function Layout({ children }) {
  const size: Size = useWindowSize();
  const isMobileView = size.width < 641;

  return (
    <>
      <NewsList hidden={isMobileView} />
      <main>{children}</main>
    </>
  );
}
