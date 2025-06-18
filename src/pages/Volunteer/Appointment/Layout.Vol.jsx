import HeaderVol from "./Header.Vol";
import { Outlet } from "react-router-dom";

function LayoutVol() {
  return (
    <>
      <HeaderVol />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  )
}

export default LayoutVol
