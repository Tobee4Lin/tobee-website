import React, { useState } from "react";
import VideoBg from "./components/videoBg";
import Glassmorphism from "./components/glassmorphism";
import Cube from "./components/cube";
import Model from "./components/model";
function Home() {
  return (
    <>
      <VideoBg />
      <Glassmorphism />
      <section style={{ width: "100%", height: "100vh" }}>
        <Model />
      </section>
      <section style={{ width: "100%", height: "50vh" }}>
        <Cube />
      </section>
    </>
  );
}

export default Home;
