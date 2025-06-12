export default function Home(props) {
    return (
        <div className='landing'>
            <h1>Quizzical</h1>
            <button onClick={props.onClick}>Start Quiz</button>
      </div>
    )
}