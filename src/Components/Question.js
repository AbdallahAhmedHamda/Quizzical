import '../CSS/Question.css'


export default function Question(props) {
  const answers = props.answers.map((answer, index) => {
    const styles = {
      backgroundColor:
        (props.check)
          ?
          (props.userAnswers[props.id] === undefined && answer.correct) ? '#BBB'
            : (answer.correct) ? '#94D7A2'
              : (props.userAnswers[props.id] === answer.answer) ? '#F8BCBC'
                : ''
          : '',
      border:
        (props.check)
          ?
          (answer.correct) ? 'none'
            : (props.userAnswers[props.id] !== answer.answer) ? '0.8px solid #8f94af'
              : ''
          : '',
      color: (props.check && !answer.correct) ? '#8f94af' : ''
    }
    return (
      <label key={index}>
        <input
          type='checkbox'
          name={props.id}
          value={answer.answer}
          checked={props.userAnswers[props.id] === answer.answer}
          onChange={props.handleChange}
          data-question-number={props.id}
          disabled={props.check}
        />
        <span className='radio-button-label' style={styles}>{answer.answer}</span>
      </label>
    )
  })
  return (
    <div>
      <p className='question'>{props.question}</p>
      <div className='answers'>
        {answers}
      </div>
      <hr />
    </div>
  )
}