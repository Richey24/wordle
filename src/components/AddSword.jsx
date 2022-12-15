import "./AddSword.css"

const AddSword = () => {
    const submitForm = (e) => {
        e.preventDefault()
    }

    const addAnother = () => {
        const theDiv = `
         <div className="theVerse">
                    <hr style="width: 100%" />
                    <label htmlFor="">Verse</label>
                    <br />
                    <input style="width: 100%; height: 50px; border: 1px solid #b9bdc5; border-radius: 2px; outline: none; padding-left: 10px" placeholder="Enter a bible verse" className="topic" type="text" name="verse" />
                    <br />
                    <br />
                    <label htmlFor="">Verse content</label>
                    <br />
                    <textarea style="width: 100%; height: 100px; border: 1px solid #b9bdc5; border-radius: 2px; outline: none; padding-left: 10px; resize: none" placeholder="Enter the verse content" className="verseContent" name="verseContent"></textarea>
        </div>
        `
        const lastDiv = document.getElementsByClassName('theVerse')
        const theLast = lastDiv[lastDiv.length - 1]
        theLast.insertAdjacentHTML("afterend", theDiv)
    }

    return (
        <div className="addMain">
            <h2>Create a new study</h2>
            <form className="addForm" onSubmit={submitForm}>
                <label htmlFor="topic">Topic</label>
                <br />
                <input placeholder="Enter the topic of your new study" className="topic" type="text" id="topic" name="topic" />
                <h6 htmlFor="">Verses</h6>
                <div className="theVerse">
                    <label htmlFor="">Verse</label>
                    <br />
                    <input placeholder="Enter a bible verse" className="topic" type="text" name="verse" />
                    <br />
                    <br />
                    <label htmlFor="">Verse content</label>
                    <br />
                    <textarea placeholder="Enter the verse content" className="verseContent" name="verseContent"></textarea>
                </div>
                <button onClick={addAnother} className="another">Add another verse</button>
                <br />
                <br />
                <label htmlFor="">Note</label>
                <br />
                <textarea placeholder="Enter study note" className="note" name="note"></textarea>
                <br />
                <button className="createStudy">Create study</button>
            </form>
        </div>
    )
}

export default AddSword