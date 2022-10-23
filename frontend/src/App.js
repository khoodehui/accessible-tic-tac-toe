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

  const joinSession = async sessionNum => {
    appService.joinSession(sessionNum, {playerName}).then(data => {
      setGameSessionNum(sessionNum)
    })
  }

  if (!playerName) {
    return <WelcomePage setPlayerName={setPlayerName} />
  } else {
    return (
      <JoinSessionPage
        playerName={playerName}
        createSession={createSession}
        joinSession={joinSession}
      />
    )
  }
}

export default App
