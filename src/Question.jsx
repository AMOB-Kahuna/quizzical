import {useState} from 'react'

export default function Question(props) {

    const [buttons, setButtons] = useState(props.options.map(option => ({option, selected: false})))

    function handleClick(answer) {
        setButtons(prevButtons => 
            prevButtons.map(button => {
                if (button.option === answer) {
                    return {...button, selected: true}
                }
                return {...button, selected: false}
            })
        )
        
        if (answer === props.answer) {
            console.log("correct")
        } else {
            console.log("wrong")
        }
    }

    return (
        <section className='question-container'>
            <p className='question'>{props.question}</p>
            <div className="options-container">
                {buttons.map(button => (
                    <button 
                        className={`option ${button.selected ? 'selected' : null}`}
                        key={button.option}
                        onClick={() => handleClick(button.option)}
                    >{button.option}</button>
                ))}
            </div>
        </section>
    )
}