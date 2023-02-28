import axios from "axios";
import { useState } from "react";
import url from "../../url";

const Notification = ({ user }) => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")

    const saveChanges = async (e) => {
        const target = e.target
        if (target.id === "email") {
            await axios.put(`${url}/user/update/${id}`, { emailNotification: target.checked }, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        } else {
            await axios.put(`${url}/user/update/${id}`, { newsletter: target.checked }, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        }
    }

    return (
        <div style={{ width: "30vw", padding: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }} className="shadow sm:rounded-md">
            <label style={{ marginTop: "30px" }} class="relative inline-flex cursor-pointer">
                <input
                    type="checkbox"
                    class="sr-only peer"
                    defaultChecked={user?.emailNotification ? true : false}
                    onChange={saveChanges}
                    id="email"
                />
                <div class="w-12 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span style={{ fontSize: "22px", fontWeight: "500" }} class="ml-3 text-sm font-medium">Email Notification</span>
            </label>
            <br />
            <label style={{ marginTop: "50px" }} class="relative inline-flex cursor-pointer">
                <input
                    type="checkbox"
                    class="sr-only peer"
                    defaultChecked={user?.newsletter ? true : false}
                    onChange={saveChanges}
                    id="news"
                />
                <div class="w-12 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span style={{ fontSize: "22px", fontWeight: "500" }} class="ml-3 text-sm font-medium">Newsletter</span>
            </label>
        </div>
    )
}

export default Notification