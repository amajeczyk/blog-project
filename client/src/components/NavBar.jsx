import React, { useEffect, useState } from "react";
import { Sidebar } from "./SideBar";
import { IconContext } from "react-icons";
import "../style/NavBar.css";
import { authenticationService } from "../_services/authentication.service";
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticationService.authenticateRequest().then((data) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <h2
                className="blog-logo"
                onClick={() => {
                  navigate("/");
                }}
              >
                BLOG IT!
              </h2>
            </li>

            {Sidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <button
                    className="button-38"
                    onClick={() => {
                      navigate("/addBlog");
                    }}
                  >
                    {item.icon}
                    <span className="title-span">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          {user ? (
            <div
              onClick={authenticationService.authenticateRequest}
              className="button-wrapper"
            >
              <button
                className="button-38"
                onClick={() => {
                  navigate("/account");
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
          {user ? (
            <div className="button-wrapper">
              <button
                className="button-38"
                onClick={() => {
                  authenticationService.logout();
                  setUser(null);
                  navigate("/");
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
