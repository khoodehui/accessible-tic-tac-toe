const Square = ({ onClick, value }) => {
  if (!value) {
    return <button className='square' aria-label='Empty square' onClick={onClick} />
  }

  return <div className='square'>{value}</div>
}

export default Square
