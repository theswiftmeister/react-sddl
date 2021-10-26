import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import projects_data from "../jsondata/projects_data.json";
import "../stylesheets/projects.css";

const maxItemsPerPage = 5;

const Projects = () => {
  const location = useLocation();

  const public_url = process.env.PUBLIC_URL;
  const [page, setPage] = useState(
    location.state === undefined ? 1 : location.state["page"]
  );
  const changePage = useCallback((e) => {
    setPage(e);
  }, []);

  return (
    <>
      <div id="all_projects" className="projects-container">
        <div className="all-projects">
          <div className="top-img-title">
            <img
              className="top-img"
              style={{ filter: "opacity(0.75)" }}
              src={`/${public_url}images/project-image-1.jpg`}
              alt=""
            />
            <p className="top-name">Projects</p>
          </div>
          <div className="projects-list-container">
            <div className="list-header">
              <h4> </h4>
              <h4 style={{ textAlign: "left" }}>Project Name</h4>
              <h4>Local Area</h4>
              <h4>Status</h4>
            </div>
            <ul className="project-list">
              <ListItem public_url={public_url} page={page} />
            </ul>
            <Pagination page={page} setPage={(e) => changePage(e)} />
          </div>
        </div>
      </div>
    </>
  );
};

const ListItem = ({ public_url, page }) => {
  return projects_data
    .slice(
      page * maxItemsPerPage - maxItemsPerPage,
      page * maxItemsPerPage >= projects_data.length
        ? projects_data.length
        : page * maxItemsPerPage
    )
    .map((item, index) => {
      const { images, name, localArea, status } = item;
      return (
        <li key={index} className="project-list-item">
          <div>
            <img
              className="item-img"
              src={
                images.length > 0
                  ? `${public_url}${images[0]}`
                  : `${public_url}images/no-image.jpg`
              }
              alt=""
            />
            <Link
              className="item-title"
              to={{ pathname: `/project/${name}`, state: { page: page } }}
              style={{
                marginLeft: "0px",
                fontSize: `${name.length > 13 ? "1.25rem" : "1.35rem"}`,
              }}
            >
              SDD {name}
            </Link>
            <p className="item-address">{localArea ? localArea : "n/a"}</p>
            <p className="item-status">{status}</p>
          </div>
        </li>
      );
    });
};

const Pagination = ({ page, setPage }) => {
  return (
    <>
      <div className="pagination">
        <button
          className="not-active-btn"
          type="button"
          disabled={page === 1 ? true : false}
          onClick={() => setPage(1)}
        >
          &#8592;
        </button>
        {Array(parseInt(projects_data.length / maxItemsPerPage) + 1)
          .fill(0)
          .map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={page === idx + 1 ? "active-btn" : "not-active-btn"}
              onClick={() => setPage(idx + 1)}
            >
              <em>{idx + 1}</em>
            </button>
          ))}
        <button
          className="not-active-btn"
          type="button"
          disabled={
            page === parseInt(projects_data.length / maxItemsPerPage) + 1
              ? true
              : false
          }
          onClick={() =>
            setPage(parseInt(projects_data.length / maxItemsPerPage) + 1)
          }
        >
          &#x2192;
        </button>
      </div>
    </>
  );
};

export default Projects;
