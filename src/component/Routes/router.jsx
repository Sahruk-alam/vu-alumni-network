import { createBrowserRouter } from "react-router";
import Layout from "../MainLayout/Layout";
import Login from "../EntryPage/Login";
import Register from "../EntryPage/Register";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Connection from "../pages/Connection";
import Messages from "../pages/Messages";
import Alerts from "../pages/Alerts";
import Profile from "../pages/Profile";
import HomeLog from "../pages/HomeLog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/jobs",
        Component: Jobs
      },
      {
        path: "/connections",
        Component: Connection
      },
      {
        path: "/messages",
        Component: Messages
      },
      {
        path: "/alerts",
        Component: Alerts
      },
      {
        path: "/profile",
        Component: Profile
      },
      {
        path: "/home-log",
        Component: HomeLog
      }
    ],
  },
  
]);