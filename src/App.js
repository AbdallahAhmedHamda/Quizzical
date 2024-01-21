import { useState } from 'react'
import { decode } from 'html-entities'
import topBlob from './blobs/top-blob.svg'
import botBlob from './blobs/bot-blob.svg'
import Question from './Components/Question'
import Quiz from './Components/Quiz'
import Intro from './Components/Intro'
import './CSS/App.css'

export default function App() {
  const [questionsData, setQuestionsData] = useState({ amount: 0, category: '', difficulty: '' })
  const [questions, setQuestions] = useState([])
  const [allShuffeledAnswers, SetAllShuffeledAnswers] = useState([])
  const [userAnswers, setUserAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [quizzical, setQuizzical] = useState(false)
  const [check, setCheck] = useState(false)

  async function startGame(event) {
    event.preventDefault()
    setQuizzical(true)
    setSubmitDisabled(true)
    const params = new URLSearchParams({ ...questionsData, type: 'multiple' })
    const api = `https://opentdb.com/api.php?${params.toString()}`
    const res = await fetch(api)
    const data = await res.json()
    setQuestions(data.results.map(question => decode(question.question)))
    SetAllShuffeledAnswers(data.results.map(question => {
      const answers = question.incorrect_answers.map(answer => {
        return { answer: decode(answer), correct: false }
      })
      const randomIndex = Math.floor(Math.random() * (answers.length + 1))
      answers.splice(randomIndex, 0, { answer: decode(question.correct_answer), correct: true })
      return answers
    }))
  }

  function handleApiChange(event) {
    const value = event.target.value
    const name = event.target.name
    setQuestionsData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function handleAnswerChange(event) {
    const value = event.target.value
    const checked = event.target.checked
    const questionNumber = event.target.dataset.questionNumber
    setUserAnswers(prevArray => {
      const newArray = [...prevArray]
      newArray[questionNumber] = checked ? value : undefined
      return newArray
    })
  }

  function checkAnswers() {
    allShuffeledAnswers.forEach((shuffeledAnswers, index) => {
      shuffeledAnswers.forEach(answer => {
        if (answer.correct && answer.answer === userAnswers[index]) {
          setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
        }
      })
    })
    setCheck(true)
  }

  function newGame() {
    setQuestionsData({ amount: 0, category: '', difficulty: '' })
    setQuestions([])
    SetAllShuffeledAnswers([])
    setUserAnswers([])
    setCorrectAnswers(0)
    setSubmitDisabled(false)
    setQuizzical(false)
    setCheck(false)
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        key={index}
        id={index}
        question={question}
        answers={allShuffeledAnswers[index]}
        userAnswers={userAnswers}
        check={check}
        handleChange={handleAnswerChange}
      />
    )
  })

  return (
    <main>
      <img src={topBlob} alt='top-blob' className='top-blob blobs' />
      <img src={botBlob} alt='bot-blob' className='bot-blob blobs' />
      <div className='content'>
        {
          (quizzical && questions.length)
            ?
            <Quiz
              questionElements={questionElements}
              check={check}
              correctAnswers={correctAnswers}
              numOfQuestions={questions.length}
              newGame={newGame}
              checkAnswers={checkAnswers}
            />
            :
            <Intro
              onSubmit={startGame}
              onChange={handleApiChange}
              questionsData={questionsData}
              disabled={submitDisabled}
            />
        }
      </div>
    </main>
  )
}