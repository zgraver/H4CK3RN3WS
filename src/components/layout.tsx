import { Size, useWindowSize } from "../app/hooks";
export default function Layout({ children }) {
  const size: Size = useWindowSize();
  const isSmall = size.width < 641;

  return isSmall ? (
    <>
      small
      <main>{children}</main>
    </>
  ) : (
    <>
      large
      <main>{children}</main>
    </>
  );
}
