import { useState } from 'react'
import './App.css'
import Home from './Home'

function App() {

  const [quizStarted, setQuizStarted] = useState(false)

  function startQuiz() {
    setQuizStarted(true)
  }

  return (
    <>
      {
        quizStarted ?
          "" :
            <Home onClick={startQuiz} />
        }
    </>
  )
}

export default App
