import React, { useEffect } from "react";
import "../stylesheets/terms.css";

import terms from "../jsondata/terms_and_condition.json";

const Terms = () => {
  const public_url = process.env.PUBLIC_URL;
  const roman_numbers = [
    "I.",
    "II.",
    "III.",
    "IV.",
    "V.",
    "VI.",
    "VII.",
    "VIII.",
    "IX.",
    "X.",
    "XI.",
    "XII.",
    "XIII.",
    "XIV.",
    "XV.",
    "XVI.",
  ];
  useEffect(() => {});
  return (
    <>
      <div>
        <div id="termsAndConditions">
          <div className="top-img-title">
            <img
              className="top-img"
              style={{ filter: "opacity(0.75)" }}
              src={`/${public_url}images/tac-image.jpg`}
              alt=""
            />
            <p className="top-name">Terms and Conditions</p>
          </div>
          <ul className="terms-list">
            <TermItems termsData={terms} numbers={roman_numbers} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Terms;

const TermItems = ({ termsData, numbers }) => {
  return termsData.map((item, index) => {
    const { term } = item;
    return (
      <li key={index} className="terms-list-item">
        <p className="numbers">{numbers[index]}</p>
        <p dangerouslySetInnerHTML={{ __html: term }} className="term-text"></p>
      </li>
    );
  });
};
