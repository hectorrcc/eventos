import { Outlet } from "react-router";
import MyAppBar from "./MyAppBar";
import MyContainer from "./MyContainer";
import MyMenu from "./MyMunu";

export default function Layout() {
  return (
    <>
      <MyAppBar />
      <MyContainer menu= {<MyMenu/>} content ={<Outlet/>} />
    </>
  );
}
