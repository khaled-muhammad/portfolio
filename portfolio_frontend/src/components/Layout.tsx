import { Outlet } from "react-router-dom";
import CustomCursor from "./CustomCursor";

export default function Layout() {
  return (
    <>
      <CustomCursor />
      {/* <Navbar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}