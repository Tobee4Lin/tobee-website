// import React from "react";
import type { RouteObject } from "@/routes/interface";
import Effect from "@/pages/effect";
import Car from "@/pages/car";
import ShiningRingCar from "@/pages/shiningRingCar";
import Reflect from "@/pages/reflect";

// Effect特效模块
const effectRouter: Array<RouteObject> = [
  {
    label: "R3F示例",
    path: "/effect",
    children: [
      {
        label: "zustand官网demo",
        subLabel: "zustand",
        path: "/effect/effect",
        element: <Effect />,
        // element: React.lazy(() => import("@/pages/effect")),
      },
      {
        label: "保时捷911",
        subLabel: "Porsche 911",
        path: "/effect/car",
        element: <Car />,
        // element: React.lazy(() => import("@/pages/car/index")),
      },
      {
        label: "光环车",
        subLabel: "ShiningCar",
        path: "/effect/shining-ring-car",
        element: <ShiningRingCar />,
        // element: React.lazy(() => import("@/pages/shiningRingCar/index")),
      },
      {
        label: "倒影",
        subLabel: "Reflect",
        path: "/effect/reflect",
        element: <Reflect />,
        // element: React.lazy(() => import("@/pages/reflect/index")),
      },
    ],
  },
];

export default effectRouter;
