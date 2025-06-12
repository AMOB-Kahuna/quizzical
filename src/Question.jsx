export default function Question(props) {
    return (
        <section className='question-container'>
            <p className='question'>{props.question}</p>
            <div className="options-container">
                {props.options.map(option => (
                    <button className='option' key={option}>{option}</button>
                ))}
            </div>
        </section>
    )
}