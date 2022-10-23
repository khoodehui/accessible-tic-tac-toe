import './App.css'
import { useState } from 'react'
import WelcomePage from './welcomePage'
import JoinSessionPage from './joinSessionPage'
import GamePage from './gamePage'
import appService from './services'

function App() {
  const [playerName, setPlayerName] = useState('')
  const [gameSessionNum, setGameSessionNum] = useState(null)

  const createSession = info => {
    appService.createSession(info).then(data => {
      setGameSessionNum(data.sessionNumber)
    })
  }

  const joinSession = async sessionNum => {
    appService.joinSession(sessionNum, {playerName}).then(data => {
      setGameSessionNum(sessionNum)
    })
  }

  if (!playerName) {
    return <WelcomePage setPlayerName={setPlayerName} />
  } else if (!gameSessionNum) {
    return (
      <JoinSessionPage
        playerName={playerName}
        createSession={createSession}
        joinSession={joinSession}
      />
    )
  } else {
    return <GamePage setGameSessionNum={setGameSessionNum} />
  }
}

export default App
