import React, { useEffect, useState, useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import projects_data from "../jsondata/projects_data.json";
import "../stylesheets/project.css";

const getRefElementScale = (ref) => {
  return parseFloat(
    ref.current.style.transform.substring(
      ref.current.style.transform.indexOf("(") + 1,
      ref.current.style.transform.indexOf(")")
    )
  );
};

const Project = () => {
  const ref = useRef(null);
  const location = useLocation();
  const public_url = process.env.PUBLIC_URL;
  const [project, setProject] = useState(projects_data[0]);
  const page = location.state["page"];
  const { projectname } = useParams();
  let isZoommed = false;

  const onMouseOver = (e) => {
    ref.current.setAttribute("src", `/${public_url}${e.target.alt}`);
    ref.current.parentNode.className += "visible";
  };
  const onMouseLeave = () => {
    ref.current.parentNode.className =
      ref.current.parentNode.className.substring(
        0,
        ref.current.parentNode.className.indexOf("visible")
      );
    ref.current.style.transform = "scale(1)";
    ref.current.style.objectPosition = "0px 0px";
    isZoommed = false;
  };
  const onMouseWheel = (e) => {
    let scale = getRefElementScale(ref);
    if (e.deltaY < 0 && scale >= 1) {
      ref.current.style.transform = `scale(${(scale += 0.1)})`;
      isZoommed = true;
    } else if (e.deltaY > 0 && scale > 1) {
      ref.current.style.transform = `scale(${(scale -= 0.1)})`;
      isZoommed = false;
    } else if (scale <= 1.4) {
      ref.current.style.objectPosition = "0px 0px";
    }
  };
  const onMouseMove = (e) => {
    let scale = getRefElementScale(ref) >= 1.4 ? getRefElementScale(ref) : 1;

    if (isZoommed && scale >= 1.4) {
      ref.current.style.objectPosition = `${
        (e.nativeEvent.target.width / 2 - e.nativeEvent.offsetX) * scale
      }px ${
        (e.nativeEvent.target.height / 2 - e.nativeEvent.offsetY) * scale
      }px`;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const newProject = projects_data.find(
      (project) => project.name === projectname
    );
    setProject({
      name: newProject.name,
      images: newProject.images,
      address: newProject.address,
      storied: newProject.storied,
      size: newProject.size,
      propertyType: newProject.propertyType,
      localArea: newProject.localArea,
      status: newProject.status,
      downloads: newProject.downloads,
    });
  }, [projectname]);

  return (
    <>
      <div className="project-container">
        <div className="top-img-title">
          <img
            className="top-img"
            style={{ filter: "opacity(0.5)" }}
            src={`/${public_url}${project.images[0]}`}
            alt={project.images[0]}
          />
          <p className="top-name">SDD {project.name}</p>
        </div>
        <div className="bread-crumb">
          <ul className="breadcrumb">
            <li>
              <Link to={"/home"}>Home</Link>
            </li>
            <li>
              <Link to={{ pathname: "/Projects", state: { page: page } }}>
                Projects
              </Link>
            </li>
            <li>{project["name"]}</li>
          </ul>
        </div>

        <div className="project-content">
          <div className="middle-section">
            <div className="project-info">
              <div className="project-property-type">
                <h4>Property type: </h4>
                <p>{project.propertyType}</p>
              </div>
              <div className="project-stories">
                <h4>Stories: </h4>
                <p>{project.storied}</p>
              </div>
              <div className="project-apartment-size">
                <h4>Apartment size: </h4>
                <p>{project.size ? project.size : "-/-"} sq.ft.</p>
              </div>
              <div className="project-address">
                <h4>Address: </h4>
                <p>{`${project.address}, ${project.localArea}`}</p>
              </div>
              <div className="project-status">
                <h4>Status: </h4>
                <p>{project.status}</p>
              </div>
            </div>
            <div className="project-images">
              <PerspectiveImages
                public_url={public_url}
                project={project}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                onMouseWheel={onMouseWheel}
                onMouseMove={onMouseMove}
              />
            </div>
            <div className="download-project-plan">
              {project.downloads.length > 0 ? (
                <DownloadLinks public_url={public_url} project={project} />
              ) : (
                <p>No download links available.</p>
              )}
            </div>
          </div>
          <div className="center-border"></div>
          <div
            className="image-div"
            style={{
              overflow: "hidden",
              margin: "16px",
              borderRadius: "6px",
              boxShadow: "10px 10px 15px 0px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src=""
              alt=""
              ref={ref}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const PerspectiveImages = ({
  public_url,
  project,
  onMouseOver,
  onMouseLeave,
  onMouseWheel,
  onMouseMove,
}) => {
  const { images } = project;
  return images.map((path, id) => {
    return (
      <div key={id}>
        <img
          src={`/${public_url}${path}`}
          alt={path}
          onMouseOver={(e) => {
            onMouseOver(e);
          }}
          onMouseLeave={(e) => {
            onMouseLeave(e);
          }}
          onWheel={(e) => {
            onMouseWheel(e);
          }}
          onMouseMove={(e) => {
            onMouseMove(e);
          }}
        />
      </div>
    );
  });
};

const DownloadLinks = ({ public_url, project }) => {
  const { downloads } = project;

  return downloads.map((path, idx) => {
    let slash_indices = [];
    for (let index = 0; index < path.length; index++) {
      const element = path[index];
      if (element === "/") {
        slash_indices.push(index);
      }
    }
    let title = path.substring(slash_indices[1] + 1, path.length - 4);
    return (
      <a key={idx} href={`/${public_url}${path}`} download>
        <span
          style={{
            fontWeight: "700",
            padding: "0 0.2rem",
            marginRight: "0.2rem",
            border: "1px solid black",
            borderRadius: "5px",
            backgroundColor: "#ededed",
          }}
        >
          &#x2193;
        </span>
        {`${title[0].toUpperCase()}${title.substring(1)}-plan`}
      </a>
    );
  });
};

export default Project;
