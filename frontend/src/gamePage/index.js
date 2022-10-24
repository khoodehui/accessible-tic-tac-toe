import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const GamePage = ({ playerName, isCreator, gameSessionNum, setGameSessionNum }) => {
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

  return (
    <div>
      <button onClick={() => setGameSessionNum(null)}>Exit</button>
      {opponentName && <p>An opponent has joined. You are playing against {opponentName}.</p>}
    </div>
  )
}

export default GamePage
