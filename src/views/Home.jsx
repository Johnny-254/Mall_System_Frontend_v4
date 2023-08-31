/* eslint-disable react/no-unescaped-entities */
import About from "../components/About";
import Contact from "../components/Contact";

function Home() {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <div className="hero-wrapper">
          <div className="hero-main">
            <h1 className="hero-main-title">Divine City</h1>
            <p className="hero-main-description">
              Discover the ultimate shopping experience at Divine City Mall.
              <br />
              There's something for everyone.
            </p>
          </div>
          <div className="hero-second">
            <h1 className="hero-second-subheading">Divine City Mall</h1>
            <p className="hero-second-subheading">Welcome</p>
          </div>
        </div>
      </section>
      <About />
      <Contact />
    </div>
  );
}

export default Home;
