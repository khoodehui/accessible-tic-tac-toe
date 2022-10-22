import './App.css'
import { useState } from 'react'
import WelcomePage from './welcomePage'

function App() {
  const [playerName, setPlayerName] = useState('')

  if (!playerName) {
    return (
      <WelcomePage setPlayerName={setPlayerName} />
    )
  }
}

export default App
