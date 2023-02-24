import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
} from "../../context";
import logImg from "../../img/Logout.svg"

import url from "../../url"
import axios from 'axios'

export function DashboardNavbar({ filterUser, username }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [ user, setUser ] = useState();

  const navigate = useNavigate()

  const id = sessionStorage.getItem("id");
  const token = localStorage.getItem("token");

  const getUserData = async () => {
    await axios.get(`${url}/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
      })
      .then( res => {
        console.log(res.data)
        setUser(res.data)
      })
  }

  const logOut = () => {
    sessionStorage.clear()
    navigate("/admin/login")
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
        ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
        : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
              }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
