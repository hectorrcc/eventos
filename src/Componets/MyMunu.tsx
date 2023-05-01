import * as React from "react";
import "../css/MyStilos.css";
import avatar from "../asset/avatars/20221217_114454.jpg";
import logo from "../asset/img/myLogo.png";
import { Link } from "react-router-dom";
import { useUserSlice } from "../redux/slices";

export default function MyMenu() {
  const userLogin = useUserSlice();
  return (
    <div className="sidebar ">
      <div className="logo-details">
        <img src={logo} className="logo-details" />
        <span className="logo_name">EventControl</span>
      </div>
      <ul className="nav-links">
        <li>
          <Link className="myLinks" to={"/"}>
            <i className="bx bx-grid-alt"></i>
            <span className="link_name">Tablero</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Tablero
              </a>
            </li>
          </ul>
        </li>

        <li>
          <Link className="myLinks" to={"/clientes"}>
            <i className="bx bxs-user-rectangle"></i>
            <span className="link_name">Clientes</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Clientes
              </a>
            </li>
          </ul>
        </li>
        <li>
          <Link className="myLinks" to={"/eventos"}>
            <i className="bx bx-calendar"></i>
            <span className="link_name">Eventos</span>
          </Link>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Eventos
              </a>
            </li>
          </ul>
        </li>
        <li>
          <div className="profile-details">
            <div className="profile-content">
              <img src={avatar} />
            </div>
            <div className="name-job">
              <div className="profile_name">{userLogin.name}</div>
              <div className="job">{userLogin.email}</div>
            </div>
            <i className="bx bx-log-out"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}
