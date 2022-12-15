import "./SwordMain.css"
import cancel from "../img/cancel.svg"
import bigdel from "../img/bigdel.svg"

const SwordMain = () => {
    const showModal = (id) => {
        document.getElementById(id).classList.toggle("show")
    }
    return (
        <div className="theMain">
            <div className="mainFirst">
                <h4>Topic: The significance of the crucifixion</h4>
                <div>
                    <p className="mainEdit">Edit</p>
                    <p onClick={() => showModal("delDivX")} className="mainDel">Delete</p>
                </div>
            </div>
            <div className="mainSecond">
                <h4>Verses</h4>
                <div>
                    <p className="mainVerse">Matthew 7:7</p>
                    <div className="verseContent"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae, quia voluptas fugit enim veritatis! Reiciendis eveniet in veritatis soluta molestias illum aliquid, enim repellat aperiam, nemo atque, impedit similique! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, quos modi. Numquam ut similique dolores deleniti expedita possimus ullam facilis illo beatae. Officia similique eius aliquid amet neque, praesentium non!</p><span onClick={() => showModal("chapterx")}>see all{">>"}</span></div>
                </div>
                <div>
                    <p className="mainVerse">John 12:2</p>
                    <div className="verseContent"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae, quia voluptas fugit enim veritatis! Reiciendis eveniet in veritatis soluta molestias illum aliquid, enim repellat aperiam, nemo atque, impedit similique! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, quos modi. Numquam ut similique dolores deleniti expedita possimus ullam facilis illo beatae. Officia similique eius aliquid amet neque, praesentium non!</p><span onClick={() => showModal("chapterx")}>see all{">>"}</span></div>
                </div>
                <div>
                    <p className="mainVerse">Psalm 130:1</p>
                    <div className="verseContent"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae, quia voluptas fugit enim veritatis! Reiciendis eveniet in veritatis soluta molestias illum aliquid, enim repellat aperiam, nemo atque, impedit similique! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, quos modi. Numquam ut similique dolores deleniti expedita possimus ullam facilis illo beatae. Officia similique eius aliquid amet neque, praesentium non!</p><span>see all{">>"}</span></div>
                </div>
                <div>
                    <p className="mainVerse">Mark 7:2</p>
                    <div className="verseContent"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam molestiae, quia voluptas fugit enim veritatis! Reiciendis eveniet in veritatis soluta molestias illum aliquid, enim repellat aperiam, nemo atque, impedit similique! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero, quos modi. Numquam ut similique dolores deleniti expedita possimus ullam facilis illo beatae. Officia similique eius aliquid amet neque, praesentium non!</p><span>see all{">>"}</span></div>
                </div>
            </div>
            <div className="mainThird">
                <h3>Note</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. At rem provident earum in nulla dolorem accusantium, dolor, incidunt consequatur molestiae facilis labore iste unde amet inventore quo neque, perspiciatis ad. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsa architecto autem! Perferendis, officia. Adipisci facilis sint labore quibusdam nihil et, temporibus quidem sapiente qui quisquam tenetur voluptatibus rerum vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur neque recusandae cumque, voluptatem dolores delectus dicta tempora velit ipsam laborum praesentium debitis libero nihil explicabo nostrum aspernatur officiis esse ducimus?</p>
            </div>
            <div id="chapterx" className="chapterx">
                <div>
                    <h5>Matthew 12:5</h5>
                    <img onClick={() => showModal("chapterx")} src={cancel} alt="" />
                </div>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab voluptas accusantium enim laboriosam laborum aut accusamus cupiditate, ducimus sed officia distinctio nesciunt, dolor minus, pariatur est quia perspiciatis placeat doloribus! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem ducimus dolores consequatur magni nesciunt quibusdam molestiae officiis, quidem possimus atque incidunt, labore similique accusamus odio? Omnis incidunt quisquam perferendis laudantium!</p>
            </div>
            <div id="delDivX" className="delDivX">
                <div className="firstDel">
                    <img src={bigdel} alt="" />
                    <div>
                        <h5>Delete study</h5>
                        <p>Are you sure you want to delete this study? This action cannot be undone.</p>
                    </div>
                </div>
                <div className="secondDel">
                    <p onClick={() => showModal("delDivX")} className="delCan">Cancel</p>
                    <p className="delDel">Delete</p>
                </div>
            </div>
        </div>
    )
}

export default SwordMain