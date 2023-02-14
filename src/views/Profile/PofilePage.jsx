import axios from 'axios';
import Header from '../../components/TheHeader.jsx';
import { useEffect, useState } from 'react';
import url from "../../url"
const id = localStorage.getItem("id")

export default function ProfilePage() {

    const token = localStorage.getItem("token")

    const [user, setUser] = useState({})
    const [loading, setLoader] = useState();

    const fetchUserInfromation = async () => {
        await axios.get(`${url}/user/get/${id}`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            .then(response => {
                console.log(response);
                setUser(response.data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchUserInfromation();
    }, [id])

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
                                <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                    <svg aria-hidden="true" class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </a>
                            </li>

                            <li>
                                <div class="flex items-center">
                                    <svg aria-hidden="true" class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Profile Settings</a>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <aside class="w-64" aria-label="Sidebar">
                            <div class="px-3 py-4 overflow-y-auto">
                                <ul class="space-y-2">


                                    <li>
                                        <a href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Profile Informations</span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Change password </span>
                                        </a>
                                    </li>

                                    <li>
                                        <a href="#"
                                            class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <svg class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                                fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                    clip-rule="evenodd"></path>
                                            </svg>
                                            <span class="flex-1 ml-3 whitespace-nowrap">Notifications</span>
                                        </a>
                                    </li>
                                    {user.paid ? <li>
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
                        <div className="col-span-3">
                            <div className="md:grid md:grid-cols-6">
                                
                                <div className="md:col-span-12 md:mt-0">
                                    {/* Profile information  */}
                                    <form action="#" method="POST">
                                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                                <div className="bg-white px-4 py-5 sm:p-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                                First name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="first-name"
                                                                value={user.name}
                                                                id="first-name"
                                                                autoComplete="given-name"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                                Last name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="last-name"
                                                                id="last-name"
                                                                autoComplete="family-name"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-4">
                                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                                Email address
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={user.email}
                                                                name="email-address"
                                                                id="email-address"
                                                                autoComplete="email"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                                                Country
                                                            </label>
                                                            <select
                                                                id="country"
                                                                value={user.country}
                                                                name="country"
                                                                autoComplete="country-name"
                                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                            >
                                                                <option>United States</option>
                                                                <option>Canada</option>
                                                                <option>Mexico</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                                Tribe
                                                            </label>
                                                            <input
                                                                type="text"
                                                                value={user.name}
                                                                name="city"
                                                                id="city"
                                                                autoComplete="address-level2"
                                                                className="mt-1 block w-full border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2 mt-5">
                                                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                                School
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="region"
                                                                id="region"
                                                                autoComplete="address-level1"
                                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>


                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                                <button
                                                    type="submit"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Profile Infromation */}

                                </div>
                            </div>
                            <div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}



