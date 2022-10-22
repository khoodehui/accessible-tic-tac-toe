import './App.css'
import { useState } from 'react'
import WelcomePage from './welcomePage'
import JoinSessionPage from './joinSessionPage'
import appService from './services'

function App() {
  const [playerName, setPlayerName] = useState('')
  const [gameSessionNum, setGameSessionNum] = useState(null)

  const createSession = async info => {
    const sessionNum = await appService.createSession(info)
    setGameSessionNum(sessionNum)
  }

  if (!playerName) {
    return <WelcomePage setPlayerName={setPlayerName} />
  } else {
    return (
      <JoinSessionPage playerName={playerName} createSession={createSession} />
    )
  }
}

export default App
