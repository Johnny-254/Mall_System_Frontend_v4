import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RingLoader } from "react-spinners";

import Experience from "../Experience/Experience.js";

import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
// import Toggle from "./components/Toggle.jsx";
import CustomerDash from "./Dashboards/CustomerDash.jsx";
// import Admin from "./Dashboards/Admin.jsx";

const Home = React.lazy(() => import("./views/Home.jsx"));
const Explore = React.lazy(() => import("./views/Explore.jsx"));
const Admin = React.lazy(() => import("./Dashboards/Admin.jsx"));

class App extends Component {
  constructor(props) {
    super(props);
    // Experience instance initialization
    this.experience = new Experience(
      document.querySelector(".experience-canvas")
    );
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <Home />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <Explore />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <Login />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/signup"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <Signup />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/CustomerDash"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <CustomerDash />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/admin"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <Admin />
                </React.Suspense>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <React.Suspense
                  fallback={
                    <RingLoader
                      color="#ff6600"
                      loading={true}
                      className="loader"
                    />
                  }
                >
                  <CustomerDash />
                </React.Suspense>
              }
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
