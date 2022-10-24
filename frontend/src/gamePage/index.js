import './styles.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Board from './Board'

const GamePage = ({
  playerName,
  isCreator,
  gameSessionNum,
  setGameSessionNum,
}) => {
  const [socket, setSocket] = useState(null)
  const [opponentName, setOpponentName] = useState(null)

  useEffect(() => {
    const newSocket = io.connect('http://localhost:3001')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])

  useEffect(() => {
    if (!socket) return
    socket.emit('join_session', {
      sessionNum: gameSessionNum,
      joinPlayerName: playerName,
      isCreator,
    })
    socket.on('opponent_joined', opponent => {
      setOpponentName(opponent)
    })
  }, [socket])

  const squares = Array(9).fill(null)
  const handleSquareClick = i => () => socket.emit('square_click', i)

  if (isCreator && !opponentName) {
    return (
      <div>
        <button onClick={() => setGameSessionNum(null)}>Exit</button>
        <p aria-live='polite'>
          Session created. Waiting for a player to join...
        </p>
      </div>
    )
  } else if (!opponentName) {
    return <p>loading...</p>
  } else {
    return (
      <div>
        <button onClick={() => setGameSessionNum(null)}>Exit</button>
        {isCreator && <p>A player has joined.</p>}
        <p>You are playing against {opponentName}.</p>
        <Board squares={squares} handleSquareClick={handleSquareClick}/>
      </div>
    )
  }
}

export default GamePage
