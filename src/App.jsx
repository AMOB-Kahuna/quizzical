import { useState } from 'react'
import {decode} from 'html-entities'
import './App.css'
import Question from './Question'

function App() {

  const [quizData, setQuizData] = useState()
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [score, setScore] = useState(0)

  // const [questionAmount, setQuestionAmount] = useState(0)
  // const [quizDifficulty, setQuizDifficulty] = useState(null)
  // const [quizCategory, setQuizCategory] = useState(0)


  function fetchQuestions () {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuizData(data.results)
      })
      .catch(err => console.error('Error fetching quiz data:', err))
  }

  function startQuiz() {
    fetchQuestions()
  }

  function onCorrect() {
    setScore(prevScore => prevScore + 1)
  }

  return (
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
            onCorrect={onCorrect}
          />
        )
      })}

      {
        !quizData ?
        <form>
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" name="amount" id="amount" min={5} />

          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="gk">General Knowledge</option>
            <option value="ebks">Entertainment: Books</option>
            <option value="efil">Entertainment: Film</option>
            <option value="etel">Entertainment: Television</option>
            <option value="evgm">Entertainment: Video Games</option>
            <option value="ebgm">Entertainment: Board Games</option>
            <option value="ecom">Entertainment: Comics</option>
            <option value="ecar">Entertainment: Cartoon and Animations</option>
            <option value="science">Science & Nature</option>
            <option value="scic">Science: Computer</option>
            <option value="scim">Science: Mathematics</option>
            <option value="scig">Science: Gadgets</option>
            <option value="sports">Sports</option>
            <option value="geography">Geography</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="art">Art</option>
            <option value="celeb">Celebrities</option>
            <option value="animal">Animals</option>
            <option value="vehicle">Vehicles</option>
          </select>

          <label htmlFor="difficulty">Difficulty</label>
          <select name="difficulty" id="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <button type='submit' className='btn start-btn'>Get Questions</button>
        </form> :
        !checkAnswers ? 
        <button className="btn check-btn" onClick={() => setCheckAnswers(true)}>Check Answers</button> :
        <div className="result-section">
          <p>You got {score} out of {quizData.length} questions</p>
          <button className='btn start-btn' onClick={ () => {
            setQuizData(null)
            setScore(0)
            setCheckAnswers(false)
            startQuiz()
          }}>Play again</button>
        </div>
      }

    </main>
  )
}

export default App
