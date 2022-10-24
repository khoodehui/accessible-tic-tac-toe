const Square = ({ onClick, value, isTurn, isGameOver }) => {
  if (value) {
    return <div className='square'>{value}</div>
  }
  // if the game is over, should not be able to press the square, so return a div
  if (isGameOver) {
    return <div className='square' aria-label='Empty square' />
  }
  if (isTurn) {
    return <button className='square' aria-label='Empty square' onClick={onClick} />
  }   
  return <button className="square" aria-label='Empty square' aria-disabled='true' />

}

export default Square
