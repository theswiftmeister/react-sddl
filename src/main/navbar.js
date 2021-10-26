import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import navbar_data from "../jsondata/navbar-data.json";

import "../stylesheets/header.css";
const header_pages = ["/home", "/Projects", "/Our_Terms_And_Conditions"];

export default function Navbar() {
  const { pathname } = useLocation();
  const getPathName = () => {
    if (pathname === "/") return `${navbar_data[0].heading}`;
    else return pathname.slice(1);
  };

  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (header_pages.includes(pathname) | /[/project/]./.test(pathname))
      setShowHeader(true);
    else setShowHeader(false);
  }, [pathname]);
  return (
    <>
      {showHeader && (
        <header>
          <div className="container">
            <nav className="navbar">
              <div className="navbar-left">
                <Link
                  to="/home"
                  onClick={() => {
                    window.scroll({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/sddl-logo.png`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="navbar-right">
                <ul className="navlist">
                  <NavLinks items={navbar_data} pathname={getPathName()} />
                </ul>
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

const NavLinks = ({ items, pathname, ref }) => {
  return items.map((item) => {
    const { id, heading, url, dropdowns } = item;
    return (
      <li
        key={id}
        className={`nav-item ${
          pathname === url ? "current-page" : "not-current-page"
        } ${dropdowns ? "dropdown" : ""}`}
      >
        <Link
          className="nav-link"
          to={`/${url}`}
          onClick={() => {
            window.scroll({ top: 0, behavior: "smooth" });
          }}
        >
          {heading}
        </Link>
        {dropdowns && (
          <div className="dropdown-content">
            <ul className="dropdown-list">
              <DropDownLinks dropdown={dropdowns} />
            </ul>
          </div>
        )}
      </li>
    );
  });
};

const DropDownLinks = ({ dropdown }) => {
  return dropdown.map((item, index) => {
    const { heading, url, elementId } = item;
    return (
      <li key={index} className="dropdown-item">
        <HashLink
          className="nav-link"
          to={`/${url}${elementId}`}
          scroll={(el) =>
            el.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        >
          {heading}
        </HashLink>
      </li>
    );
  });
};
