import axios from "axios";
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
        <div style={{ width: "60vw", padding: "20px" }} className="shadow sm:rounded-md">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <label style={{ fontSize: "22px", fontWeight: "500" }} htmlFor="email">Email Notification</label>
                <input defaultChecked={user?.emailNotification ? true : false} onChange={saveChanges} style={{ width: "25px", height: "25px", cursor: "pointer" }} id="email" type="checkbox" />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                <label style={{ fontSize: "22px", fontWeight: "500" }} htmlFor="news">Newsletter</label>
                <input defaultChecked={user?.newsletter ? true : false} onChange={saveChanges} style={{ width: "25px", height: "25px", cursor: "pointer" }} id="news" type="checkbox" />
            </div>
        </div>
    )
}

export default Notification