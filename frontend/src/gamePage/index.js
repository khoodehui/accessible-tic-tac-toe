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
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isTurn, setIsTurn] = useState(isCreator)

  const playerSymbol = isCreator ? 'X' : 'O'

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
    socket.on('fill_square', newSquares => {
      setSquares(newSquares)
      setIsTurn(true)
    })
  }, [socket])

  const handleSquareClick = i => () => {
    const newSquares = [...squares]
    newSquares[i] = playerSymbol
    setSquares(newSquares)
    socket.emit('square_click', {
      sessionNum: gameSessionNum,
      newSquares: newSquares,
    })
    setIsTurn(false)
  }

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
        {isCreator && <p aria-live='assertive'>A player has joined.</p>}
        <p aria-live='polite'>
          You are playing against {opponentName}. Your symbol is {playerSymbol}.
        </p>
        <p aria-live='polite'>
          {isTurn
            ? 'It\'s your turn. Please select a square to play.'
            : 'It\'s your opponent\'s turn now. Please wait'}
        </p>
        <Board
          isTurn={isTurn}
          squares={squares}
          handleSquareClick={handleSquareClick}
        />
      </div>
    )
  }
}

export default GamePage
