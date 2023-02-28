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
          name: "Profile Information",
          path: "/",
        },
        {
          icon: <UserCircleIcon {...icon} />,
          name: "Change Password",
          path: "/change-password",
        },

        {
            icon: <UserCircleIcon {...icon} />,
            name: "Notifications",
            path: "/notifications",
        },

        {
            icon: <UserCircleIcon {...icon} />,
            name: "Notification Settings",
            path: "/notification-settings",
        },
      
      ],
    }
  ];
  
  export default routes;
  