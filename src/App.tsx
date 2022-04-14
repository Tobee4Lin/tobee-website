import React, { Suspense } from "react";
import { Loader } from "@react-three/drei";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "@/components/layout/nav/index";
import routes from "@/routes";

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <Nav />
        <Routes>
          {routes.map((r) => (
            <Route path={r.path} key={r.path} element={<r.element />} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
