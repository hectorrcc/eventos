import * as React from "react";
import "../css/MyStilos.css";
import avatar from '../asset/avatars/20221217_114454.jpg'
import logo from '../asset/img/myLogo.png'

export default function MyMenu() {
  return (
    <div className="sidebar ">
      <div className="logo-details">
        <img src={logo} className="logo-details" />
        <span className="logo_name">EventControl</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">
            <i className="bx bx-grid-alt"></i>
            <span className="link_name">Tablero</span>
          </a>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Tablero
              </a>
            </li>
          </ul>
        </li>

        <li>
          <a href="/clientes">
            <i className="bx bxs-user-rectangle"></i>
            <span className="link_name">Clientes</span>
          </a>
          <ul className="sub-menu blank">
            <li>
              <a className="link_name" href="#">
                Clientes
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/eventos">
            <i className="bx bx-calendar"></i>
            <span className="link_name">Eventos</span>
          </a>
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
              <div className="profile_name">Héctor Cabrera</div>
              <div className="job">Computer Ingineer</div>
            </div>
            <i className="bx bx-log-out"></i>
          </div>
        </li>
      </ul>
    </div>
  );
}
