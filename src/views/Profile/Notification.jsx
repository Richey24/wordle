import axios from "axios";
import { useState } from "react";
import url from "../../url";

const Notification = ({ user }) => {
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const [can, setCan] = useState(false)


    const saveChanges = async (e) => {
        const target = e.target
        if (target.id === "email") {
            await axios.put(`${url}/user/update/${id}`, { emailNotification: target.checked }, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        } else {
            await axios.put(`${url}/user/update/${id}`, { newsletter: target.checked }, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        }
    }

    const cancelSub = async () => {
        const body = {
            email: user.email,
            id: user._id,
            firstName: user.firstName
        }
        const res = await axios.post(`http://localhost:5000/user/cancel/sub/mail`, body, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        if (res.status === 200) {
            setCan(true)
        }
        console.log(res);
    }

    return (
        <div style={{ width: "30vw", padding: "20px", display: "flex", justifyContent: "center", alignItems: "flex-start", flexDirection: "column" }} className="shadow sm:rounded-md">
            {can && <p>An email has been sent to you, check your mail to confirm the cancellation request</p>}
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
            {user?.paid && <p
                onClick={cancelSub}
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                style={{ cursor: "pointer", marginTop: "40px" }}
            >Cancel Subscription</p>}
        </div>
    )
}

export default Notification