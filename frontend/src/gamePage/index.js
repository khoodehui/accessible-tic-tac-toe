import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const GamePage = ({ setGameSessionNum }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const newSocket = io.connect('http://localhost:3001')
    setSocket(newSocket)
    return () => newSocket.close()
  }, [])

  return (
    <div>
      <button onClick={() => setGameSessionNum(null)}>Exit</button>
    </div>
  )
}

export default GamePage
