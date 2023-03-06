import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"
import "./Deck.css"

const Deck = () => {
    const navigate = useNavigate()
    const [decks, setDecks] = useState([])

    const getDeck = async () => {
        const token = sessionStorage.getItem("token")
        try {
            const res = await axios.get(`${url}/deck/get/all`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            const rep = await res.data
            console.log(rep);
            setDecks(rep)
        } catch (error) {
            // navigate("/admin/login")
        }
    }

    useEffect(() => {
        getDeck()
    }, [])

    const addDeck = async () => {
        const token = sessionStorage.getItem("token")
        const body = {
            color1: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
            color2: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
        }
        await axios.post(`${url}/deck/create`, body, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
        getDeck()
    }

    return (
        <div className="mainDeck">
            <button
                onClick={addDeck}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 fw-bold"
            >Add Deck</button>
            <div className="innerDeck">
                {
                    decks.map((ar, i) => (
                        <div onClick={() => navigate(`/admin/hebrew/${i + 1}`)} key={i} style={{ backgroundImage: `linear-gradient(120deg, ${ar?.color1} 0%, ${ar?.color2} 100%)` }}>Deck {i + 1}</div>
                    ))
                }
            </div>
        </div>
    )
}

export default Deck