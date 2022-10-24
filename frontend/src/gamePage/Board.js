import Square from './Square'

const Board = ({ squares, handleSquareClick, isTurn }) => {
  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={handleSquareClick(i)}
        isTurn={isTurn}
      />
    )
  }

  return (
    <div>
      <table>
        <caption>Game Board</caption>
        <tbody>
          <tr>
            <td>{renderSquare(0)}</td>
            <td>{renderSquare(1)}</td>
            <td>{renderSquare(2)}</td>
          </tr>
          <tr>
            <td>{renderSquare(3)}</td>
            <td>{renderSquare(4)}</td>
            <td>{renderSquare(5)}</td>
          </tr>
          <tr>
            <td>{renderSquare(6)}</td>
            <td>{renderSquare(7)}</td>
            <td>{renderSquare(8)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Board
