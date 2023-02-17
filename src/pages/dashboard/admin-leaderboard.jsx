import { useState, useEffect } from "react"
import axios from "axios"
import url from "../../url"

export function AdminLeaderboard() {

    const [leaderboard, setLeaderboard ] = useState([]);

    const fetchLeaderboard = async () => {
        const token = sessionStorage.getItem("token");
        await axios.get(`${url}/api/leaderboard`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        .then( res => {
            let data = res.data;
            setLeaderboard(data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        fetchLeaderboard();
    }, [leaderboard])

    return (
        <div>
            
        </div>
    )
}