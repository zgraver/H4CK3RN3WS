import { Size, useWindowSize } from "../app/hooks";
import NewsList from "../components/newsList";
export default function Layout({ children }) {
  const size: Size = useWindowSize();
  const isSmall = size.width < 641;

  return isSmall ? (
    <>
      <main>{children}</main>
    </>
  ) : (
    <>
      <NewsList />
      <main>{children}</main>
    </>
  );
}
