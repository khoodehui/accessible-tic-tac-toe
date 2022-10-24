import './styles.css'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Board from './Board'

const GamePage = ({
  playerName,
  isCreator,
  gameSessionNum,
  leaveSession,
}) => {
  const [socket, setSocket] = useState(null)
  const [opponentName, setOpponentName] = useState(null)
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isTurn, setIsTurn] = useState(isCreator)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWinner, setIsWinner] = useState(null)

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
    socket.on('win_game', () => {
      setIsGameOver(true)
      setIsWinner(true)
    })
    socket.on('lose_game', () => {
      setIsGameOver(true)
      setIsWinner(false)
    })
  }, [socket])

  const handleSquareClick = i => () => {
    const newSquares = [...squares]
    newSquares[i] = playerSymbol
    setSquares(newSquares)
    socket.emit('square_click', {
      sessionNum: gameSessionNum,
      isCreator,
      clickedSquareNum: i,
      newSquares: newSquares,
    })
    setIsTurn(false)
  }

  const generateGameInfoText = () => {
    if (isGameOver) {
      return isWinner ? 'You win!' : 'Your opponent has won the game.'
    } else {
      return isTurn
        ? "It's your turn. Please select a square to play."
        : "It's your opponent's turn now. Please wait."
    }
  }

  if (isCreator && !opponentName) {
    return (
      <div>
        <button onClick={() => leaveSession()}>Exit</button>
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
        <button onClick={() => leaveSession()}>Exit</button>
        {isCreator && <p aria-live='assertive'>A player has joined.</p>}
        <p aria-live='polite'>
          You are playing against {opponentName}. Your symbol is {playerSymbol}.
        </p>
        <p aria-live='polite'>{generateGameInfoText()}</p>
        {isGameOver && (
          <p aria-live='polite'>
            To leave the session, press the exit button at the top of this page.
          </p>
        )}
        <Board
          isTurn={isTurn}
          squares={squares}
          isGameOver={isGameOver}
          handleSquareClick={handleSquareClick}
        />
      </div>
    )
  }
}

export default GamePage
