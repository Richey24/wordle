import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Spinner } from "react-bootstrap"
import url from "../url"
import "./Leader.css"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToolbox, faPlus, faHome } from '@fortawesome/fontawesome-free-solid'

import benjamin from "../img/benjamin.png"
import dan from "../img/dan.png"
import ephraim from "../img/ephraim.png"
import gad from "../img/gad.png"
import issachar from "../img/issachar.png"
import joseph from "../img/joseph.png"
import judah from "../img/judah.png"
import levi from "../img/levi.png"
import manasseh from "../img/manasseh.png"
import naftali from "../img/naftali.png"
import reuben from "../img/reuben.png"
import simeon from "../img/simeon.png"
import zebulun from "../img/zebulun.png"
import asher from "../img/asher.png"
import { useNavigate } from "react-router-dom"
import test from "../img/test.mp4"

const images = {
    benjamin: benjamin,
    dan: dan,
    ephraim: ephraim,
    gad: gad,
    issachar: issachar,
    joseph: joseph,
    judah: judah,
    levi: levi,
    manasseh: manasseh,
    naftali: naftali,
    reuben: reuben,
    simeon: simeon,
    zebulun: zebulun,
    asher: asher
}

const BibleLeader = () => {
    const [users, setUsers] = useState([])
    const [spin, setSpin] = useState(false)
    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            console.log('sad');
            const res = await axios.get(`${url}/user/find/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                validateStatus: () => true
            })
            const rep = await res.data
            console.log(res.status);
            if (res.status !== 200) {
                setSpin(false)
                navigate("/login")
                return
            }
            console.log(rep);
            const arr = rep.sort((a, b) => b.dailyBQS - a.dailyBQS)
            setUsers(arr)
            setSpin(false)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (spin) {
        return (
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Spinner animation="border" color="#3d1152" />
            </div>
        )
    }

    return (
        <Container fluid id="videowrapper" className="bg-purple  min-vh-100 video-container">
           <video src={bground} autoPlay muted loop id='thevid' />
        
        
            <div className="mainTable">
                <video className="doom" autoPlay muted loop>
                    <source src={test} type="" />
                </video>
                <div>
                    <p onClick={() => navigate("/")}>Home</p>
                    <h3>Bible Quest Daily Leader Board</h3>
                    <div className="firstTable">
                        <p>Username</p>
                        <p>Tribe</p>
                        <p>Score</p>
                    </div>
                    {
                        users.map((user, i) => (
                            <div key={i} className="secondTable">
                                <p>{user?.username}</p>
                                <img src={images[user?.tribe[0]?.toLowerCase()]} alt="" />
                                <p>{user?.bibleQuestScore}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Container>
    )
}

export default BibleLeader