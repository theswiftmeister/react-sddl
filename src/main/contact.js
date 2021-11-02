import { React, useState } from "react";
import "../stylesheets/contact.css";

const Contact = () => {
  const public_url = process.env.PUBLIC_URL;
  const [appointmentType, setAppointmentType] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [addInfo, setaddInfo] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section id="contact">
        <div className="top-img-title">
          <img
            className="top-img"
            style={{ filter: "opacity(0.75)" }}
            src={`/${public_url}images/contact-1.jpg`}
            alt=""
          />
          <p className="top-name">Contact Us</p>
        </div>
        <div className="book-appointment">
          <img
            className="heading-image1"
            src={`${public_url}/images/search-image.png`}
            alt=""
          />
          <h1 className="section-headings">Looking for a place?</h1>
          <span className="underline"></span>
          <p>Book an appointment or Visit us at the address below.</p>
          <div className="contact-content">
            <div className="left">
              <div id="contact-us" className="contact-form">
                <form onSubmit={handleOnSubmit} encType="text/plain">
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <label
                      htmlFor="appointmentType"
                      style={{ paddingRight: "0.5rem" }}
                    >
                      Appointment For :
                    </label>
                    <select
                      name="appointmentType"
                      id="appointmentType"
                      style={{
                        border: "2px solid black",
                      }}
                      onChange={(e) => {
                        setAppointmentType(e.target.value);
                      }}
                    >
                      <option value="consultancy">Consultancy</option>
                      <option value="apartment">Apartment related</option>
                    </select>
                  </div>
                  <div className="row">
                    <label htmlFor="fullName">Name :</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      onChange={(e) => {
                        if (/^[a-zA-Z ]*$/.test(e.nativeEvent["data"])) {
                          setFullName(e.target.value);
                        }
                      }}
                      required
                      maxLength="20"
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="contactNo">Contact No. :</label>
                    <input
                      type="number"
                      id="contactNo"
                      name="contactNo"
                      required
                      maxLength="11"
                      value={contactNo}
                      onChange={(e) => {
                        setContactNo(e.target.value);
                      }}
                    />
                  </div>
                  <div className="row">
                    <label htmlFor="eMail">Email :</label>
                    <input
                      type="email"
                      id="eMail"
                      name="eMail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="row" style={{ position: "relative" }}>
                    <label htmlFor="addInfo">Additional Info:</label>
                    <label
                      style={{
                        position: "absolute",
                        right: "0",
                        top: "15px",
                        fontSize: "0.7em",
                      }}
                    >
                      characters left: {120 - addInfo.length}
                    </label>
                    <textarea
                      type="text"
                      value={addInfo}
                      id="addInfo"
                      name="addInfo"
                      rows="4"
                      maxLength="120"
                      onChange={(e) => {
                        setaddInfo(e.target.value);
                      }}
                    />
                  </div>
                  <input className="submit-btn" type="submit" value="Send" />
                </form>
              </div>
            </div>
            <div className="right">
              <div>
                <div>
                  <img
                    className="location"
                    src={`/${public_url}images/address-image.png`}
                    alt=""
                  />
                  <p>Location</p>
                </div>
                <p style={{ lineHeight: "1.5" }}>
                  2nd floor,
                  <span style={{ display: "block" }}>
                    69/1 Suvastu Chandrashila Tower
                  </span>
                  <span>Panthapath, Dhaka-1205.</span>
                </p>
              </div>
              <div>
                <div>
                  <img src={`/${public_url}images/phone-image.png`} alt="" />
                  <p>Phone</p>
                </div>
                <p>+88 029641386,+88 0174 0573192, +88 0174 0573193</p>
              </div>
              <div>
                <div>
                  <img src={`/${public_url}images/email-image.png`} alt="" />
                  <p>Email</p>
                </div>
                <p>info@spacedesignbd.com .</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
