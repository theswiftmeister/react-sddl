import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./home";
// import About from "./about";
import Contact from "./contact";
import Error from "./error";
import Project from "./project";
import Projects from "./projects";
// import Services from "./services";
import Terms from "./terms";

// Header Footer imports
import Navbar from "./navbar";
import Footer from "./footer";

import "../stylesheets/page-header.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/project/:projectname" children={<Project />}></Route>
        <Route exact path="/Projects">
          <Projects />
        </Route>
        {/* Excluded from build but not omitted from future inclusions.
        <Route exact path="/Services">
          <Services />
        </Route> */}
        <Route exact path="/Our_Terms_And_Conditions">
          <Terms />
        </Route>
        <Route exact path="/Contact_Us">
          <Contact />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
