import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useMediaQuery } from "react-responsive";
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mediaQ = useMediaQuery({
    query: "(min-width: 769px)",
  });

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
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
              <img
                className="navbar-img"
                src={`${process.env.PUBLIC_URL}/images/sddl-logo.png`}
                alt=""
                onClick={() => {
                  window.scroll({ top: 0, behavior: "smooth" });
                }}
              />
              <div className="navbar-right">
                {mediaQ ? (
                  <ul className="navlist">
                    <NavLinks items={navbar_data} pathname={getPathName()} />
                  </ul>
                ) : (
                  <NavbarToggler
                    isCollapsed={isCollapsed}
                    handleCollapse={handleCollapse}
                    items={navbar_data}
                    pathname={getPathName()}
                  />
                )}
              </div>
            </nav>
          </div>
        </header>
      )}
    </>
  );
}

const NavLinks = ({ items, pathname }) => {
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

const NavbarToggler = ({ isCollapsed, handleCollapse, items, pathname }) => {
  return (
    <>
      <div
        className="collapse-toggler"
        onClick={() => {
          handleCollapse();
        }}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      {isCollapsed && (
        <div className={`collapse ${isCollapsed && "collapse-show"}`}>
          <ul>
            <NavLinks items={items} pathname={pathname} />
          </ul>
        </div>
      )}
    </>
  );
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
