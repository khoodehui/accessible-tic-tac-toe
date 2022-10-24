import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const GamePage = ({ gameSessionNum, setGameSessionNum }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    console.log(gameSessionNum, typeof(gameSessionNum))
    const newSocket = io.connect('http://localhost:3001')
    setSocket(newSocket)

    return () => newSocket.close()
  }, [])


  useEffect(() => {
    if (!socket) return;
    socket.emit('join_session', gameSessionNum)
    
  }, [socket])

  return (
    <div>
      <button onClick={() => setGameSessionNum(null)}>Exit</button>
    </div>
  )
}

export default GamePage
