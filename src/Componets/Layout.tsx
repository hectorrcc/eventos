import { Outlet } from "react-router";
import MyAppBar from "./MyAppBar";
import MyContainer from "./MyContainer";
import MyMenu from "./MyMunu";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

export default function Layout() {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <MyAppBar />
        <MyContainer menu={<MyMenu />} content={<Outlet />} />
      </SnackbarProvider>
    </>
  );
}
