import axios from "axios"
import url from "../../url"
import { useEffect, useState } from "react"
import churches from "../../utils/church"
import drop from "../../img/drop.svg"
import "../../Register.css"

const tribes = [
    ["Asher", "rgb(111, 111, 21)"],
    ["Dan", "rgb(250, 100, 125)"],
    ["Ephraim", "rgb(58, 58, 241)"],
    ["Gad", "rgb(142, 200, 239)"],
    ["Issachar", "rgb(12, 57, 11)"],
    ["Joseph", "rgb(12, 571, 31)"],
    ["Manasseh", "rgb(237, 31, 237)"],
    ["Naphtali", "lightgreen"],
    ["Reuben", "orangered"],
    ["Simeon", "black"],
    ["Zebulun", "rgb(79, 7, 7)"],
    ["Levi", "rgb(79, 7, 7)"],
    ["Judah", "purple"],
    ["Benjamin", "rgb(249, 213, 115)"],
]

const ProfileInfo = () => {
    const [user, setUser] = useState()
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const [country, setCountry] = useState([])
    const [fil, setFIl] = useState([])
    const [count, setCount] = useState(0)
    const [err, showErr] = useState(false)
    const [show, setShow] = useState(false)

    const fetchUserInfromation = async () => {
        await axios.get(`${url}/user/get/${id}`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            .then(async (response) => {
                setUser(response.data)
                const res = await axios.get("https://restcountries.com/v3.1/all")
                const rep = await res.data
                const arr = rep.sort((a, b) => a.name.common.localeCompare(b.name.common))
                const countryIndex = arr.findIndex((ar) => ar.name.common === response.data.country[0])
                setCount(countryIndex)
                setCountry(arr)
                setFIl(arr)

            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchUserInfromation();
    }, [id])

    const selectCountry = () => {
        document.getElementById("country").classList.toggle("showDrop")
    }


    const getCountry = (value) => {
        setCount(value)
        selectCountry()
    }

    const filterCountry = (e) => {
        const val = e.target.value
        const arr = fil.filter((fi) => fi.name.common.toLowerCase().includes(val.toLowerCase()))
        setCountry(arr)
    }

    const updateUser = async (e) => {
        e.preventDefault()
        showErr(false)
        setShow(false)
        const body = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            tribe: e.target.tribe.value.split("-"),
            church: e.target.church.value,
            country: [country[count]?.name?.common, country[count]?.flags.svg]
        }
        const res = await axios.put(`${url}/user/update/${id}`, body, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        window.scrollTo(0, 0)
        if (res.status !== 200) {
            showErr(true)
        } else {
            setShow(true)
        }
    }


    return (
        <div className="col-span-3">
            <div className="md:grid md:grid-cols-6">

                <div className="md:col-span-12 md:mt-0">
                    {/* Profile information  */}
                    {show && <p>Profile Information Saved</p>}
                    {err && <p>An Error Occurred, Try again</p>}
                    <form onSubmit={updateUser}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                defaultValue={user?.firstName}
                                                id="firstName"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div style={{ marginTop: "10px" }} className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                defaultValue={user?.lastName}
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div style={{ marginTop: "10px" }} className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                defaultValue={user?.email}
                                                name="email"
                                                id="email"
                                                autoComplete="email"
                                                className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <br />
                                        <div className='tribeDiv'>
                                            <label>Select your country</label>
                                            <p id='countryMain' onClick={selectCountry} className='tribeMain'> {country[count]?.name?.common} <img src={drop} alt="" /></p>
                                            <ul id='country' className='tribeList'>
                                                <input style={{ width: "100%", height: "50px", paddingLeft: "10px" }} onChange={filterCountry} placeholder='Search country' type="text" />
                                                {
                                                    country.map((county, i) => (
                                                        <li onClick={() => getCountry(i)}><img src={county?.flags.svg} alt="" /> {county?.name.common}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div style={{ marginTop: "10px" }} className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                Tribe
                                            </label>
                                            <select
                                                id="tribe"
                                                name="tribe"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {
                                                    tribes.map((tribe) => (
                                                        <option selected={tribe[0] === user?.tribe[0] ? true : false} value={`${tribe[0]}-${tribe[1]}`}>{tribe[0]}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2 mt-5">
                                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                School
                                            </label>
                                            <select
                                                id="church"
                                                name="church"
                                                autoComplete="country-name"
                                                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {
                                                    churches.map((church) => (
                                                        <option selected={church === user?.church ? true : false} value={church}>{church}</option>
                                                    ))
                                                }
                                            </select>
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