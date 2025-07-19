import {useState, useEffect} from 'react'

export default function Question(props) {
    const [buttons, setButtons] = useState(props.options.map(option => ({
        option,
        correct: false,
        incorrect: false,
        selected: false,
        disabled: false
    })))

    function handleClick(answer) {
        setButtons(prevButtons => 
            prevButtons.map(button => {
                if (button.option === answer) {
                    return {...button, selected: true}
                }
                return {...button, selected: false}
            })
        )
    }

    function checkAnswer() {

        if (props.checkAnswers) {
            setButtons(prevButtons => prevButtons.map(button => {
                if (button.selected && button.option === props.answer) {
                    props.onCorrect()
                    return {...button, correct: true, disabled: true}
                } else if (button.selected && button.option != props.answer) {
                    return {...button, incorrect: true, disabled: true}
                } else if (!button.selected && button.option === props.answer) {
                    return {...button, correct: true, disabled: true}
                }
    
                return {...button, disabled: true}
            }))
        }
    }

    useEffect(() => {checkAnswer()}, [props.checkAnswers])

    return (
        <section className='question-container'>
            <p className='question'>{props.question}</p>
            <div className="options-container">
                {buttons.map(button => (
                    <button 
                        className={`option ${
                            button.correct ? 'correct' :
                            button.incorrect ? 'incorrect' :
                            button.selected ? 'selected' : null
                        }`}
                        key={button.option}
                        onClick={() => handleClick(button.option)}
                        disabled={button.disabled}
                    >{button.option}</button>
                ))}
            </div>
        </section>
    )
}