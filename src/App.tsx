import React, { Suspense } from "react";
import { Loader } from "@react-three/drei";
import "./App.css";
import Nav from "@/components/layout/nav/index";
import { Router } from "@/routes";

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Nav />
        <Router />
      </Suspense>
    </div>
  );
};

export default App;
