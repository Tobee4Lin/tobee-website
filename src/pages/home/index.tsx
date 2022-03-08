import React, { useState } from "react";
import Nav from "@/components/layout/nav/index";
import Cube from "./components/cube";
import Message from "./components/message";
function Home() {

    return (
        <>
            <Nav />
            <section style={{ width: "100%", height: "30vh" }}>
                <Message message="123" />
            </section>
            <section style={{ width: "100%", height: "50vh" }}>
                <Cube />
            </section>
        </>
    )
}

export default Home;
