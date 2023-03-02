import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Activity } from "../pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "user",
        path: "/users",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Acitivity ",
        path: "/activities",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Leaderboard ",
        path: "/leaderboard",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Bible Trivial",
        path: "/trivial",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Audit",
        path: "/audit",
        element: <Activity />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "Hebrew Game",
      //   path: "/deck",
      //   element: <Home />,
      // },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Trash",
        path: "/trash",
        element: <Home />,
      },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Home />,
      // },
    ],
  }
];

export default routes;
