import React from "react";
import Home from "@/pages/home";
import Effect from "@/pages/effect";
import Car from "@/pages/car";
import ShiningRingCar from "@/pages/shiningRingCar";

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
  {
    path: "/shining-ring-car",
    element: ShiningRingCar,
  },
];

export default routes;
