import { useState } from 'react'
import './App.css'
import Home from './Home'
import Question from './Question'

function App() {

  const [quizStarted, setQuizStarted] = useState(false)

  function startQuiz() {
    setQuizStarted(true)
  }

  return (
    <>
      {
        quizStarted ?
          <main>
            <Question
              question="How would one say goodbye in Spanish?"
              options={['Adiós', 'Hola', 'Au Revoir', 'Salir']}
            />

            <Question
              question="How would one say goodbye in Spanish?"
              options={['Adiós', 'Hola', 'Au Revoir', 'Salir']}
            />

            <Question
              question="How would one say goodbye in Spanish?"
              options={['Adiós', 'Hola', 'Au Revoir', 'Salir']}
            />

            <Question
              question="How would one say goodbye in Spanish?"
              options={['Adiós', 'Hola', 'Au Revoir', 'Salir']}
            />

            <Question
              question="How would one say goodbye in Spanish?"
              options={['Adiós', 'Hola', 'Au Revoir', 'Salir']}
            />

            <button className="btn check-btn">Check Answers</button>
          </main> :
            <Home onClick={startQuiz} />
        }
    </>
  )
}

export default App
