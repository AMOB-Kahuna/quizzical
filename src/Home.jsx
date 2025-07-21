import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className='landing'>
            <h1>Quizzical</h1>
            <Link to="/quiz" className="btn start-btn">Start Quiz</Link>
      </div>
    )
}