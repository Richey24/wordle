import axios from "axios"
import url from "../../url"
import { useEffect, useState } from "react"

const ProfileInfo = () => {
    const [user, setUser] = useState({})
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")

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
    )
}

export default ProfileInfo