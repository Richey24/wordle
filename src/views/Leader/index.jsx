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
        (async () => {
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
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white align-middle">
                                    {
                                        users.map((user, i) => (
                                            user.dailyWQS !== 0 &&
                                            <tr key={i}>
                                                <td>{user?.username}</td>
                                                <td><Image fluid src={images[user?.tribe[0]?.toLowerCase()]} alt="" style={{ width: 100, height: 100 }} /></td>
                                                <td>{user?.dailyWQS}</td>
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
                        <Col md={3}>
                            <Card >
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-0.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-0.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-1.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-1.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground('https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-2.mp4')} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-2.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-3.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-3.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-4.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-4.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-5.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-5.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-6.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-6.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-7.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-7.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-8.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-8.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-9.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-9.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-10.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-10.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-11.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-11.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-12.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-12.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-13.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-13.mp4" type="" />
                                </video>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <video onClick={() => setBackground("https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-14.mp4")} className="card-video" autoPlay muted loop>
                                    <source src="https://absa7kzimnaf.blob.core.windows.net/newcontainer/vid-14.mp4" type="" />
                                </video>
                            </Card>
                        </Col>

                    </Row>
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