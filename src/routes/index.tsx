import React from "react";
import Home from "@/pages/home";
import Effect from "@/pages/effect";
import Car from "@/pages/car";

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/effect",
    element: Effect,
  },
  {
    path: "/car",
    element: Car,
  },
];

export default routes;
