import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";


import { DashboardNavbar, SidenavAccount} from '../widgets/layout';
import  DashboardHeader  from '../widgets/layout/dashboard-header';

import routes from '../routes/account';
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import { Button } from "@material-tailwind/react";
import { ThemeProvider } from "@material-tailwind/react";
function Index() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
             <SidenavAccount routes={routes}
              brandImg={
                sidenavType === "white" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
              }
            />
            <div className="p-4 xl:ml-80">
               <DashboardNavbar />
                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(dispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                </IconButton>

                <Outlet />
                <div className="text-blue-gray-600">
                    {/* <Footer /> */}
                </div>
            </div>
        </div> 
    );
}

export default Index;
