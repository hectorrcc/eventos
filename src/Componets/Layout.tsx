import { Outlet } from "react-router";
import MyContainer from "./MyContainer";
import MyMenu from "./MyMunu";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";

export default function Layout() {
  return (
    <>
      <MyMenu />
      <section className="home-section">
        <div className="home-content">
          <i id="bottonMenu" className="bx bx-menu"></i>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Tablero
            </Link>

            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
        <MyContainer content={<Outlet />} />
      </section>
    </>
  );
}
