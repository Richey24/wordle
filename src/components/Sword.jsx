import "./Sword.css"
import cancel from "../img/cancel.svg"
import edit from "../img/Edit.svg"
import del from "../img/Delete.svg"
import bigdel from "../img/bigdel.svg"
import { useEffect } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const arr = ['a', 'b', 'c', 'd']
const Sword = () => {
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const showModal = (id) => {
        document.getElementById(id).classList.toggle("show")
    }

    return (
        <div className="swordDiv">
            <h1>My sword and shield</h1>
            <div className="swordSearch">
                <input placeholder="Type to search" type="text" />
                <p>Add new</p>
            </div>
            <div className="swordMain">
                {
                    arr.map((ar, i) => (
                        <div key={i}>
                            <div className="swordBtn" id="swordBtn">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="edit">Edit</Tooltip>}>
                                    <img style={{ marginRight: "20px" }} src={edit} alt="" />
                                </OverlayTrigger>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip id="delete">Delete</Tooltip>}>
                                    <img onClick={() => showModal("delDiv")} src={del} alt="" />
                                </OverlayTrigger>
                            </div>
                            <div onClick={() => navigate(`/watchman/${ar}`)} className="innerSword">
                                <h4>The significance of the crucifixion</h4>
                            </div>
                            <div className="verses">
                                <p onClick={() => showModal("chapter")} >Matthew 12:5</p>
                                <p onClick={() => showModal("chapter")} >John 3:16</p>
                                <p onClick={() => showModal("chapter")} >Psalm 91:1-8</p>
                                <p onClick={() => showModal("chapter")} >Act 3:15</p>
                            </div>
                            <p onClick={() => navigate(`/watchman/${ar}`)} className="theNote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus exercitationem porro a vel? Earum deserunt, placeat, blanditiis reiciendis obcaecati quam iste temporibus magnam nesciunt consequatur, itaque accusantium. Aperiam, cupiditate itaque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto voluptatem quis incidunt optio pariatur blanditiis. Reiciendis dicta nisi eos hic, obcaecati pariatur id odio recusandae iste aliquid libero quod delectus.</p>
                        </div>
                    ))
                }
            </div>
            <div id="chapter" className="chapter">
                <div>
                    <h5>Matthew 12:5</h5>
                    <img onClick={() => showModal("chapter")} src={cancel} alt="" />
                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab voluptas accusantium enim laboriosam laborum aut accusamus cupiditate, ducimus sed officia distinctio nesciunt, dolor minus, pariatur est quia perspiciatis placeat doloribus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ducimus dolores consequatur magni nesciunt quibusdam molestiae officiis, quidem possimus atque incidunt, labore similique accusamus odio? Omnis incidunt quisquam perferendis laudantium!</p>
            </div>
            <div id="delDiv" className="delDiv">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete study</h5>
                        <p>Are you sure you want to delete this study? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="secondDel">
                    <p onClick={() => showModal("delDiv")} className="delCan">Cancel</p>
                    <p className="delDel">Delete</p>
                </div>
            </div>
        </div>
    )
}

export default Sword