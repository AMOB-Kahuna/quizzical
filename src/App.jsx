import { useState } from 'react'
import {decode} from 'html-entities'
import './App.css'
import Question from './Question'

function App() {

  const [quizData, setQuizData] = useState()
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCategory, setQuizCategory] = useState(null)
  const [quizQuestions, setQuizQuestions] = useState(0)
  const [quizDifficulty, setQuizDifficulty] = useState(null)
  let [formSubmitButtonText, setFormSubmitButtonText] = useState("Start Quiz")


  function fetchQuestions (amount, category, difficulty) {
    fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        setQuizData(data.results)
      })
      .catch(err => console.error('Error fetching quiz data:', err))
  }

  function onCorrect() {
    setScore(prevScore => prevScore + 1)
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    setFormSubmitButtonText("Fetching Questions...")

    const formData = new FormData(e.target)
    const amount = formData.get("amount")
    const difficulty = formData.get("difficulty")
    let category = 0

    const formCategory = formData.get("category")
    switch (formCategory) {
      case 'gk':
        category = 9
        setQuizCategory("General Knowledge")
        break
      case 'ebks':
        category = 10
        setQuizCategory("Entertainment: Books")
        break
      case 'efil':
        category = 11
        setQuizCategory("Entertainment: Films")
        break
      case 'etel':
        category = 14
        setQuizCategory("Entertainment: Television")
        break
      case 'evgm':
        category = 15
        setQuizCategory("Entertainment: Video Games")
        break
      case 'ebgm':
        category = 16
        setQuizCategory("Entertainment: Board Games")
        break
      case 'ecom':
        category = 29
        setQuizCategory("Entertainment: Comics")
        break
      case 'ecar':
        category = 32
        setQuizCategory("Entertainment: Cartoon and Animations")
        break
      case 'science':
        category = 17
        setQuizCategory("Science and Nature")
        break
      case 'scic':
        category = 18
        setQuizCategory("Science: Computer")
        break
      case 'scim':
        category = 19
        setQuizCategory("Science: Mathemetics")
        break
      case 'scig':
        category = 30
        setQuizCategory("Science: Gadgets")
        break
      case 'sports':
        category = 21
        setQuizCategory("Sports")
        break
      case 'geography':
        category = 22
        setQuizCategory("Geography")
        break
      case 'history':
        category = 23
        setQuizCategory("History")
        break
      case 'politics':
        category = 24
        setQuizCategory("Politics")
        break
      case 'art':
        category = 25
        setQuizCategory("Art")
        break
      case 'celeb':
        category = 26
        setQuizCategory("Celebrities")
        break
      case 'animal':
        category = 27
        setQuizCategory("Animals")
        break
      case 'vehicle':
        category = 28
        setQuizCategory("Vehicles")
        break
    }

    
    // console.log(amount)
    // console.log(difficulty)
    // console.log(category)
    setQuizQuestions(amount)
    setQuizDifficulty(difficulty)
    fetchQuestions(amount, category, difficulty)
  }

  return (
    <>
      <main>
        {quizData && 
          <section>
            <div className="quiz-header">
              <h2>Category: <span>{quizCategory}</span></h2>
              <h2>Questions: <span>{quizQuestions}</span></h2>
              <h2>Difficulty: <span 
                className={quizDifficulty != "hard" && quizDifficulty != "medium" ? "easy" :
                  quizDifficulty != "hard" && quizDifficulty != "easy" ? "medium" : "hard"
                 }>
              {quizDifficulty}</span></h2>
            </div>
            {quizData.map( (item, index) => {
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
          </section>
        }

        {
          !quizData ?
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <label htmlFor="amount">Number of Questions</label>
            <input type="number" name="amount" id="amount" min={5} max={50} />

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

            <button type='submit' className='btn start-btn'>{formSubmitButtonText}</button>
          </form> :
          !checkAnswers ? 
          <button className="btn check-btn" onClick={() => setCheckAnswers(true)}>Check Answers</button> :
          <div className="result-section">
            <p>You got {score} out of {quizData.length} questions</p>
            <button className='btn start-btn' onClick={ () => {
              setQuizData(null)
              setScore(0)
              setCheckAnswers(false)
              setFormSubmitButtonText("Start Quiz")
            }}>Play again</button>
          </div>
        }

      </main>
    </>
  )
}

export default App
