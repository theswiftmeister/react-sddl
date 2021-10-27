import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import projects_data from "../jsondata/projects_data.json";
import "../stylesheets/projects.css";

const maxItemsPerPage = 5;

const Projects = () => {
  const location = useLocation();
  const public_url = process.env.PUBLIC_URL;
  const [projectList, setProjectList] = useState(projects_data);
  const inputNameRef = useRef(null);
  const inputAreaRef = useRef(null);
  const inputStatusRef = useRef(null);

  const [page, setPage] = useState(
    location.state === undefined ? 1 : location.state["page"]
  );
  const changePage = useCallback((e) => {
    setPage(e);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let project_arr = projects_data;

    if (
      !inputNameRef.current.value &&
      !inputAreaRef.current.value &&
      inputStatusRef.current.value === "any"
    ) {
      setProjectList(projects_data);
    } else {
      setProjectList(
        project_arr.filter(
          (item) =>
            (inputStatusRef.current.value === "any"
              ? true
              : item.status.toLowerCase() ===
                inputStatusRef.current.value.toLowerCase()) &&
            item.name
              .toLowerCase()
              .includes(inputNameRef.current.value.toLowerCase()) &&
            item.localArea
              .toLowerCase()
              .includes(inputAreaRef.current.value.toLowerCase())
        )
      );
    }
    clearInputRefs();
  };

  const clearInputRefs = () => {
    inputNameRef.current.value = "";
    inputAreaRef.current.value = "";
    inputStatusRef.current.value = "any";
  };

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
          <div className="search-div">
            <form
              action=""
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <label htmlFor="search-input-name">Search by name: </label>
              <input
                type="text"
                name="search-input-name"
                id="search-input-name"
                ref={inputNameRef}
              />
              <label htmlFor="search-input-area">Search by area: </label>
              <input
                type="text"
                name="search-input-area"
                id="search-input-area"
                ref={inputAreaRef}
              />
              <label htmlFor="search-input-status">Select status: </label>
              <select
                name="select-status"
                id="select-status"
                ref={inputStatusRef}
                style={{
                  fontSize: "1.15rem",
                  padding: "2px",
                  border: "2px solid black",
                }}
              >
                <option value="any">All</option>
                <option value="completed">Completed</option>
                <option value="in development">In Development</option>
              </select>

              <button className="form-submit" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="projects-list-container">
            <div className="list-header">
              <h4> </h4>
              <h4 style={{ textAlign: "left" }}>Project Name</h4>
              <h4>Local Area</h4>
              <h4>Status</h4>
            </div>
            <ul className="project-list">
              <ListItem
                project_list={projectList}
                public_url={public_url}
                page={page}
              />
            </ul>
            <Pagination
              project_list={projectList}
              page={page}
              setPage={(e) => changePage(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const ListItem = ({ project_list, public_url, page }) => {
  console.log("df");
  return project_list
    .slice(
      page * maxItemsPerPage - maxItemsPerPage,
      page * maxItemsPerPage >= project_list.length
        ? project_list.length
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

const Pagination = ({ project_list, page, setPage }) => {
  const arr_size = parseInt(
    project_list.length % maxItemsPerPage === 0
      ? project_list.length / maxItemsPerPage
      : project_list.length / maxItemsPerPage + 1
  );
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
        {Array(arr_size)
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
          disabled={page === arr_size ? true : false}
          onClick={() => setPage(arr_size)}
        >
          &#x2192;
        </button>
      </div>
    </>
  );
};

export default Projects;
