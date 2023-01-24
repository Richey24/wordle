import CrosswordPuzzle from "./components/Crossword.jsx"

export default function Puzzle() {
    return<div>
        <div className="min-h-full">
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <CrosswordPuzzle />
                </div>
            </main>
        </div>
    </div>
}