class myFunction {
    switchNum() {
        const noOfWord = document.getElementById("noOfWord")
        const myGuessGrid = document.getElementById("guessGrid")
        const guessGrid = document.querySelector("[data-guess-grid]")
        noOfWord.addEventListener("change", (e) => {
            const value = e.target.value
            myGuessGrid.style.gridTemplateColumns = `repeat(${value}, 2.7em)`
            myGuessGrid.style.gridTemplateRows = `repeat(${Number(value) + 1}, 2.7em)`
            guessGrid.innerHTML = ""
            console.log(value * Number(value) + Number(value));
            for (let index = 0; index < value * Number(value) + Number(value); index++) {
                myGuessGrid.innerHTML += `<div class="tile"></div>`
            }
        })
    }
}

const func = new myFunction()
export default func