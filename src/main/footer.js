import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "../stylesheets/footer.css";
const footer_pages = ["/home", "/Projects", "/Our_Terms_And_Conditions"];

export default function Footer() {
  const { pathname } = useLocation();
  const [showFooter, setShowFooter] = useState(false);
  useEffect(() => {
    if (footer_pages.includes(pathname)) setShowFooter(true);
    else setShowFooter(false);
  }, [pathname]);

  return (
    <>
      {showFooter && (
        <footer>
          <div className="container">
            <div className="footer-top">
              <img
                className="footer-logo"
                src={`${process.env.PUBLIC_URL}/images/full-logo.png`}
                alt=""
              />
              <div className="footer-item">
                <Link className="footer-link" to={"/Contact_Us"}>
                  Book an Appointment
                </Link>
                <Link className="footer-link" to={"/Projects"}>
                  Projects
                </Link>
                <Link className="footer-link" to={"/Our_Terms_And_Conditions"}>
                  Legal Terms & Conditions
                </Link>
              </div>
              <div className="footer-address">
                <p>Phone: +88-01740573192, 02-9641386</p>
                <p>Address: Level-2, Chandrashila Tower.</p>
                <p>69/1 Panthapath Road, Dhaka, Bangladesh.</p>
                <p>Email: info@spacedesignbd.com.</p>
              </div>
            </div>
            <div className="footer-bottom">
              <cite className="copyright">
                Copyright © 2021 Space Design & Development. All Rights Reserved
              </cite>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

// const FooterItem = ({ items }) => {
//   return items.map((item, index) => {
//     const { title, url, subItems } = item;
//     return (
//       <li key={index} className="footer-item">
//         {url ? (
//           <>
//             <Link className="footer-heading" to={url}>
//               {title}
//             </Link>
//             <ul className="footer-sublist">
//               <FooterLink items={subItems} url={url} />
//             </ul>
//           </>
//         ) : (
//           <>
//             <p className="footer-heading">{title}</p>
//             <ul className="footer-sublist">
//               <FooterLink items={subItems} url="" />
//             </ul>
//           </>
//         )}
//       </li>
//     );
//   });
// };

// const FooterLink = ({ items, url }) => {
//   return items.map((item, index) => {
//     const { name, hash } = item;
//     return (
//       <li key={index} className="footer-sublist-item">
//         <HashLink to={`${url}${hash}`} className="footer-link">
//           {name}
//         </HashLink>
//       </li>
//     );
//   });
// };
