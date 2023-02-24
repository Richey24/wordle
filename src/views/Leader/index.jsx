import axios from "axios"
import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

import "./leader.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToolbox, faPlus, faHome } from '@fortawesome/fontawesome-free-solid';

import Modal from 'react-bootstrap/Modal';

// begin:Assets
import url from "../../url"
import benjamin from "../../img/benjamin.png"
import dan from "../../img/dan.png"
import ephraim from "../../img/ephraim.png"
import gad from "../../img/gad.png"
import issachar from "../../img/issachar.png"
import joseph from "../../img/joseph.png"
import judah from "../../img/judah.png"
import levi from "../../img/levi.png"
import manasseh from "../../img/manasseh.png"
import naftali from "../../img/naftali.png"
import reuben from "../../img/reuben.png"
import simeon from "../../img/simeon.png"
import zebulun from "../../img/zebulun.png"
import asher from "../../img/asher.png"
import video from "../../utils/video";
import THeHeader from "../../components/TheHeader";
// end:Assets

// Videos

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

const Leader = () => {
    const [users, setUsers] = useState([])
    const [spin, setSpin] = useState(true)
    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const navigate = useNavigate()

    const [bground, setBackground] = useState(() => {
        // getting stored value
        const saved = localStorage.getItem("background1");
        const initialValue = saved;
        return initialValue || "";
    });


    // Pop functionalies goes here
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    }

    useEffect(() => {
        if (!token || !id) {
            navigate("/login")
        }
        (async () => {
            try {
                const res1 = await axios.get(`${url}/user/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    validateStatus: () => true
                })
                const rep1 = await res1.data
                if (token !== rep1.mainToken) {
                    navigate("/login")
                }
                const res = await axios.get(`${url}/user/find/all`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    validateStatus: () => true
                })
                const rep = await res.data
                if (res.status !== 200) {
                    setSpin(false)
                    navigate("/login")
                    return
                }
                const arr = rep.sort((a, b) => b.dailyWQS - a.dailyWQS)
                setUsers(arr)
                setSpin(false)
            } catch (error) {
                navigate("/word")
            }
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // storing input name
        localStorage.setItem("background1", bground);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bground]);

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
            <THeHeader />
            <video src={bground} autoPlay muted loop id='thevid' />
            <Container fluid id="videoMessage">
                <Container>
                    <Row>                            <Col className="text-center mt-5 mb-5">
                        <h3 className="text-white">Word Quest Daily Leader Board</h3>
                    </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Table borderless className="justify-content-center">
                                <thead className="border-bottom">
                                    <tr className="text-white">
                                        <th>Username</th>
                                        <th>Tribe</th>
                                        <th>School</th>
                                        <th>Country</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white align-middle">
                                    {
                                        users.map((user, i) => (
                                            user.dailyWQS !== 0 &&
                                            <tr key={i}>
                                                <td style={{ textTransform: "uppercase" }}>{user?.username}</td>
                                                <td style={{ display: "flex", justifyContent: "center" }}><Image fluid src={images[user?.tribe[0]?.toLowerCase()]} alt="" style={{ width: 160, height: 160 }} /></td>
                                                <td>{user?.church}</td>
                                                <td style={{ width: "160px", height: "160px" }}><img src={user?.country[1]} alt="" /></td>
                                                <td>{user?.dailyWQS?.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </Container>



            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Video Background </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        {
                            video.map((vid, i) => (
                                <Col key={i} md={3}>
                                    <Card >
                                        <video onClick={() => setBackground(`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${vid}.mp4`)} className="card-video" autoPlay muted loop>
                                            <source src={`https://absa7kzimnaf.blob.core.windows.net/newcontainer/${vid}.mp4`} type="" />
                                        </video>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <button onClick={() => setShow(false)} style={{ marginLeft: "85%" }} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                </Modal.Body>
            </Modal>

            <div className="fab-container">
                <div className="fab shadow">
                    <div className="fab-content">
                        <FontAwesomeIcon icon={faPlus} className="text-white" />
                    </div>
                </div>
                <div className="sub-button shadow">
                    <a onClick={handleShow} href="/" target="_blank">
                        <FontAwesomeIcon icon={faToolbox} className="text-white" />
                    </a>
                </div>

                <div className="sub-button shadow">
                    <Link to="/">
                        <FontAwesomeIcon icon={faHome} className="text-white" />
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default Leader