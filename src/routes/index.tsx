// import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "./interface";
import Home from "@/pages/home";
import Blog from "@/pages/blog";
import BlogDetail from "@/pages/blog/detail";
import Page404 from "@/components/ErrorMessage/404";

// 导入所有router
const metaRouters = require.context("./modules/", false, /\.tsx$/);
const routerArray: RouteObject[] = [];
// const metaRouters = import.meta.webpackContext("./modules", {
//   recursive: false,
//   regExp: /\.tsx$/,
// });
// 处理路由
metaRouters.keys().forEach((key) => {
  routerArray.push(metaRouters(key)?.default?.[0]);
});
export const routes: RouteObject[] = [
  {
    label: "首页",
    path: "/",
    element: <Home />,
  },
  ...routerArray,
  {
    label: "博客",
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/detail",
    element: <BlogDetail />,
  },
  {
    path: "*",
    // element: lazy(() => import("@/components/ErrorMessage/404")),
    element: <Page404 />,
  },
];
export const Router = () => {
  const rootRoutes = useRoutes(routes);
  return rootRoutes;
};
