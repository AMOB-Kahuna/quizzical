import { useState } from 'react'
import {decode} from 'html-entities'
import './App.css'
import Home from './Home'
import Question from './Question'

function App() {

  const [quizStarted, setQuizStarted] = useState(false)
  const [quizData, setQuizData] = useState()
  const [checkAnswers, setCheckAnswers] = useState(false)

  function startQuiz() {
    setQuizStarted(true)

    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuizData(data.results)
      })
      .catch(err => console.error('Error fetching quiz data:', err))
  }

  return (
    <>
      {
        quizStarted ?
          <main>
            {quizData && quizData.map( (item, index) => {
              const question = item.question
              let options = [...item.incorrect_answers, item.correct_answer]
              const answer = item.correct_answer
              options = options.sort(() => Math.random() - 0.5)
              return (
                <Question
                  key={index}
                  question={decode(question)}
                  options={options}
                  answer={answer}
                  checkAnswers={checkAnswers}
                />
              )
            })}

            {
              !checkAnswers ? 
              <button className="btn check-btn" onClick={() => setCheckAnswers(true)}>Check Answers</button> :
              <div>
                <p>Your score</p>
                <button className='btn start-btn' onClick={startQuiz}>Play again</button>
              </div>
            }

          </main> :
            <Home onClick={startQuiz} />
        }
    </>
  )
}

export default App
