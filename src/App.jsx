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
          <main>
            <section className='question-container'>
              <p className='question'>How would one say goodbye in Spanish?</p>
              <div className="options-container">
                <button className='option'>Adiós</button>
                <button className='option'>Hola</button>
                <button className='option'>Au Revoir</button>
                <button className='option'>Salir</button>
              </div>
            </section>
          </main> :
            <Home onClick={startQuiz} />
        }
    </>
  )
}

export default App
