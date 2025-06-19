import HeaderUs from "./Header.User";
import { Outlet } from "react-router-dom";

function LayoutUs() {
  return (
    <>
      <HeaderUs />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutUs
