import '../CSS/Quiz.css'

export default function Quiz(props) {
  return (
    <div className='questions'>
      {props.questionElements}
      {
        (props.check)
          ?
          <div className='result'>
            <p className='correct-answers'>You scored {props.correctAnswers}/{props.numOfQuestions} correct answers</p>
            <button className='new-game-btn' onClick={props.newGame}>Play again</button>
          </div>
          :
          <div className='result'>
            <button className='check-btn' onClick={props.checkAnswers}>Check answers</button>
          </div>
      }
    </div>
  )
}