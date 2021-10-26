import React, { useState } from "react";

const Services = () => {
  const [count, setCount] = useState(10);
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div id="check_offers">
          <h1>Check out available offers</h1>
        </div>
        <div id="consult">
          <h1>Consultancy</h1>
          <br />
          <br />
          <br />
          <br />
          <h1>{count}</h1>
          <button type="button" onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      </div>
    </>
  );
};

export default Services;
