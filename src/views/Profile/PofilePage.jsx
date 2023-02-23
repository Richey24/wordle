import axios from 'axios';
import Header from '../../components/TheHeader.jsx';
import { useEffect, useState } from 'react';
import url from "../../url"
import ProfileInfo from './ProfileInfo.jsx';
import ChangePass from './ChangePass.jsx';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.jsx';
const id = localStorage.getItem("id")

export default function ProfilePage() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [active, setActive] = useState("info")
    // const [loading, setLoader] = useState();

    const fetchUserInformation = async () => {
        await axios.get(`${url}/user/get/${id}`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err);
                // navigate("/login")
            })
    }

    useEffect(() => {
        fetchUserInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="absolute w-auto min-w-full min-h-full max-w-none">
            <Header />
            <div className="container mx-auto px-6 py-16">
                <div className="mx-auto ">

                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="min-w-0 flex-1">
                        </div>
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <p href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </p>
                            </li>

                            <li>
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <p href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Profile Settings</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <aside class="w-64" aria-label="Sidebar">
                            <div class="px-3 py-4 overflow-y-auto">
                                <ul class="space-y-2">


                                    <li style={{ cursor: "pointer" }} onClick={() => setActive("info")}>
                                        <p href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Profile Informations</span>
                                        </p>
                                    </li>

                                    <li style={{ cursor: "pointer" }} onClick={() => setActive("pass")}>
                                        <p href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Change password </span>
                                        </p>
                                    </li>

                                    <li style={{ cursor: "pointer" }} onClick={() => setActive("notification")}>
                                        <p href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Notifications</span>
                                        </p>
                                    </li>
                                    {user.paid ? <li style={{ cursor: "pointer" }}>
                                        <a href="https://billing.stripe.com/p/login/bIY3gifgJ8Hb0ZW288"
                                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg
                                                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="flex-1 ml-3 whitespace-nowrap">Billings & Payments</span>
                                        </a>
                                    </li> : ""}

                                </ul>
                            </div>
                        </aside>
                        {active === "info" && <ProfileInfo />}
                        {active === "pass" && <ChangePass />}
                        {active === "notification" && <Notification user={user} />}
                    </div>

                </div>
            </div>
        </div>
    )
}



