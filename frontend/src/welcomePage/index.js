import { useState } from 'react'

const WelcomePage = ({ setPlayerName }) => {
  const [nameFieldValue, setNameFieldValue] = useState('')
  const [isSubmittingEmpty, setIsSubmittingEmpty] = useState(false)

  const handleSubmit = event => {
    event.preventDefault()
    if (nameFieldValue.length === 0) {
      setIsSubmittingEmpty(true)
    } else {
      setPlayerName(nameFieldValue)
    }
  }
  const handleNameFieldChange = event => {
    if (isSubmittingEmpty) {
      setIsSubmittingEmpty(false)
    }
    setNameFieldValue(event.target.value)
  }

  return (
    <div>
      <h1>Welcome</h1>
      <p>To start playing, please enter your name.</p>
      {isSubmittingEmpty && (
        <p aria-live='polite'>Please enter a non-empty name.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={nameFieldValue}
          onChange={handleNameFieldChange}
        />
        <button type='submit'>Confirm</button>
      </form>
      <p></p>
    </div>
  )
}

export default WelcomePage
