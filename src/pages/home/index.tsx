import React, { useState } from "react";
import Nav from "@/components/layout/nav/index";
import VideoBg from "./components/videoBg";
import Cube from "./components/cube";
function Home() {
  return (
    <>
      <Nav />
      <VideoBg />
      <section style={{ width: "100%", height: "50vh" }}>
        <Cube />
      </section>
    </>
  );
}

export default Home;
