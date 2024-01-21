import '../CSS/Intro.css'

export default function Intro(props) {
  const categories = ['General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations']

  const selectElements = categories.map((category, index) => {
    return (
      <option key={index} value={index + 9}>{category}</option>
    )
  })

  return (
    <div className='intro'>
      <p className='main-text'>Quizzical</p>
      <form onSubmit={props.onSubmit}>
        <div className='api-data'>
          <div className='option'>
            <label htmlFor='amount'>Number of Questions:</label>
            <input
              type='number'
              name='amount'
              id='amount'
              min='1'
              max='50'
              onChange={props.onChange}
              value={props.questionsData.amount}
            />
          </div>
          <div className='option'>
            <label htmlFor='category'>Select Category:</label>
            <select
              id='category'
              name='category'
              value={props.questionsData.category}
              onChange={props.onChange}
            >
              <option value=''>Any Category</option>
              {selectElements}
            </select>
          </div>
          <div className='option'>
            <label htmlFor='difficulty'>Select Difficulty:</label>
            <select
              id='difficulty'
              name='difficulty'
              value={props.questionsData.difficulty}
              onChange={props.onChange}
            >
              <option value=''>Any Difficulty</option>
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
        </div>
        <button className='start-btn' disabled={props.disabled}>Start quiz</button>
      </form>
    </div>
  )
}