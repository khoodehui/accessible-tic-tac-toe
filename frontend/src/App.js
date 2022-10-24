import './App.css'
import { useState } from 'react'
import WelcomePage from './welcomePage'
import JoinSessionPage from './joinSessionPage'
import GamePage from './gamePage'
import appService from './services'

function App() {
  const [playerName, setPlayerName] = useState('')
  const [isCreator, setIsCreator] = useState(false)
  const [gameSessionNum, setGameSessionNum] = useState(null)

  const createSession = info => {
    appService.createSession(info).then(data => {
      setGameSessionNum(Number(data.sessionNumber))
      setIsCreator(true)
    })
  }

  const joinSession = sessionNum => {
    appService.joinSession(sessionNum, { playerName }).then(data => {
      setGameSessionNum(Number(sessionNum))
    })
  }

  const leaveSession = sessionNum => {
    setIsCreator(false)
    setGameSessionNum(null)
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
    return (
      <GamePage
        playerName={playerName}
        isCreator={isCreator}
        gameSessionNum={gameSessionNum}
        leaveSession={leaveSession}
      />
    )
  }
}

export default App
