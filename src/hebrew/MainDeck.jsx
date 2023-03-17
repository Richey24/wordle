import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import THeHeader from '../components/TheHeader'
import url from '../url'
import "./MainDeck.css"
import padlock from "../img/padlock.png"

const MainDeck = () => {

    const [decks, setDecks] = useState([])
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const getDeck = async () => {
        const res = await axios.get(`${url}/deck/get/all`)
        const rep = await res.data
        console.log(rep);
        setDecks(rep)
    }

    const getUser = async () => {
        const id = localStorage.getItem("id")
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get(`${url}/user/get/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: () => true
            })
            if (res.status === 401) {
                navigate("/login")
            }
            const rep = await res.data
            setUser(rep)
        } catch (error) {
            navigate("/login")
        }
    }

    useEffect(() => {
        getUser()
        getDeck()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const nav = (i, color) => {
        if (user?.deckLevel < i) {
            return
        }
        navigate(`/hebrew/${i}`, { state: color })
    }

    return (
        <div>
            <THeHeader />
            <div className='mainDeckDiv'>
                <div onClick={() => navigate("/alphabet")} className='alphaDiv'>
                    Learn Hebrew Alphabet
                </div>
                {
                    decks.map((deck, i) => (
                        <div onClick={() => nav(i + 1, `linear-gradient(120deg, ${deck?.color1} 0%, ${deck?.color2} 100%)`)} style={{ backgroundImage: `linear-gradient(120deg, ${deck?.color1} 0%, ${deck?.color2} 100%)` }} key={i}>
                            Deck {i + 1}
                            {user?.deckLevel < i + 1 && <img src={padlock} alt="" />}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MainDeck