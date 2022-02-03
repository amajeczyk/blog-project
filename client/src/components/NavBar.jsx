import React from "react";
import { Sidebar } from "./SideBar";
import { IconContext } from "react-icons";
import "../style/NavBar.css";
import { authenticationService } from "../_services/authentication.service";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <h2>BLOG IT</h2>
            </li>

            {Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <button className="button-38">
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {props.user ? (
            <div
              onClick={authenticationService.authenticateRequest}
              className="button-wrapper"
            >
              <button
                className="button-38"
                onClick={() => {
                  navigate("/login"); //navigate elsewhere
                }}
              >
                Account
              </button>
            </div>
          ) : (
            <div className="button-wrapper">
              <button
                className="button-38"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </button>
            </div>
          )}
          {props.user ? (
            <div className="button-wrapper">
              <button
                className="button-38"
                onClick={() => {
                  authenticationService.logout();
                  props.setCurrenUser();
                }}
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="button-wrapper">
              <button
                className="button-38"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </div>
          )}
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavBar;
