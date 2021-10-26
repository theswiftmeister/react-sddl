import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import carousel_data from "../jsondata/carousel-data.json";
import cards_data from "../jsondata/projects_data.json";
import "../stylesheets/carousel.css";

const delay = 10000;

const Home = () => {
  const public_url = process.env.PUBLIC_URL;
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(true);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prev) => (prev === carousel_data.length - 1 ? 0 : prev + 1)),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <>
      <section id="top-section">
        <div className="carousel">
          <div className="carousel-container">
            <ul>
              {
                <CarouselItem
                  items={carousel_data}
                  public_url={public_url}
                  index={index}
                  readMore={readMore}
                  setReadMore={setReadMore}
                />
              }
            </ul>
            <div className="slider-btm-arrows">
              <div className="arrows"></div>
              <div className="arrows"></div>
              <div className="arrows"></div>
            </div>
          </div>
          <div className="carousel-bottom">
            <div className="carousel-slider-dots">
              {carousel_data.map((_, i) => (
                <span
                  key={i}
                  className={`slider-dot ${
                    index === i ? "slider-dot-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIndex(i);
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="mid-section" className="">
        <div id="about-us" className="about-us">
          <img
            className="heading-image1"
            src={`${public_url}/images/sddl-logo.png`}
            alt=""
          />
          <h1 className="section-headings">About Us</h1>
          <span className="underline"></span>
          <div className="first-row">
            <div className="about-us-img">
              <img src={`${public_url}/images/about-1-img.jpg`} alt="" />
            </div>
            <div className="about-us-text">
              <h3>Who are we?</h3>
              <div
                className="underline"
                style={{ width: "10%", margin: "0px auto" }}
              ></div>
              <p>
                Space Design & Development (Pvt) Ltd. is a real estate company
                that practices the guidelines of architecture and design set by
                the Bangladesh University of Engineering Technology. We are a
                group of professionals who feel comfortable in slow and steady
                proceedings towards a particular goal.
              </p>
            </div>
          </div>
          <div className="second-row">
            <div className="about-us-text">
              <h3>What are our strengths?</h3>
              <div
                className="underline"
                style={{ width: "10%", margin: "0px auto" }}
              ></div>
              <p>
                We have experienced architects, engineers and administrative
                staffs capable of designing remarkable interior and exterior
                projects with utmost quality. We are able to construct moderate
                size building as well as producing every types of furnitures. We
                are primarily an architectural association that is supported by
                a group of experienced execution teams and manufacturing teams.
              </p>
            </div>
            <div className="about-us-img">
              <img src={`${public_url}/images/about-2-img.jpg`} alt="" />
            </div>
          </div>
          <div className="third-row">
            <div className="about-us-img">
              <img src={`${public_url}/images/about-3-img.jpg`} alt="" />
            </div>
            <div className="about-us-text">
              <h3>What are our goals?</h3>
              <div
                className="underline"
                style={{ width: "10%", margin: "0px auto" }}
              ></div>
              <p>
                We aim to satisfy our customers with our product and promises,
                and provide them with paramount priority and quality. We value
                our customers time and always focus on delivering within
                deadlines.
              </p>
            </div>
          </div>
        </div>
        <div id="featured_projects">
          <img
            className="heading-image1"
            src={`${public_url}/images/featured-image.png`}
            alt=""
          />
          <h1 className="section-headings">Featured Projects</h1>
          <span className="underline"></span>
          <div className="featured-cards-container">
            <Cards public_url={public_url} />
          </div>
        </div>
      </section>
      <section id="btm-section" className="container"></section>
    </>
  );
};

export default Home;

const CarouselItem = ({ items, public_url, index }) => {
  const list_items = items.map((item) => {
    const { id, title, info, image } = item;
    return (
      <li
        key={id}
        className={`carousel-item ${
          index === id ? "carousel-item-show" : "carousel-item-hide"
        }`}
      >
        <img
          src={`${public_url}${image}`}
          alt=""
          className="item-image"
          style={id === 0 ? {} : {}}
        />
        <div
          className={`${index === 0 ? "" : "title-info-text"}
          ${index === id ? "title-slide-in" : "title-slide-out"} `}
        >
          <h3
            className={`item-title-text ${
              index === id ? "" : "item-title-text-ttb"
            }`}
          >
            {title}
          </h3>
          <div
            className={`item-info-text ${
              index === id ? "" : "item-info-text-btt"
            }`}
          >
            {info.map((txt, id) => (
              <p
                key={id}
                className="info-text"
                style={
                  id === 0 ? { fontSize: "1.25rem" } : { fontSize: "1.35rem" }
                }
                dangerouslySetInnerHTML={{ __html: txt }}
              ></p>
            ))}
          </div>
        </div>
      </li>
    );
  });
  return list_items;
};

const Cards = React.memo(({ public_url }) => {
  return cards_data.slice(0, 2).map((card, index) => {
    const { images, name, localArea } = card;
    return (
      <Link
        key={index}
        className="cards"
        to={{ pathname: `/project/${name}`, state: { page: 1 } }}
      >
        <div className="image">
          <div className="card-details">
            <h2 className="card-title">{name}</h2>
            <p className="address">{localArea}</p>
          </div>
          <img
            className="card-image"
            src={`${public_url}${images[0]}`}
            alt={`${public_url}${images[0]}`}
          />
        </div>
      </Link>
    );
  });
});
