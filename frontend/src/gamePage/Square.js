const Square = ({ onClick, value, isTurn }) => {
  if (value) {
    return <div className='square'>{value}</div>
  } else if (isTurn) {
    return <button className='square' aria-label='Empty square' onClick={onClick} />
  } else {
    return <button className="square" aria-label='Empty square' aria-disabled='true' />
  }
}

export default Square
