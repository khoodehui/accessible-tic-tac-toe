import { useState, useEffect } from 'react'
import appService from '../services'

const SelectSession = ({ setIsSelectingSession, joinSession }) => {
  const [availableSessions, setAvailableSessions] = useState([])

  useEffect(() => {
    appService.getAvailableSessions().then(res => {
      setAvailableSessions(res)
    })
  }, [])

  const handleJoinSession = sessionNum => () => joinSession(sessionNum)

  if (!availableSessions) {
    return 'loading'
  }
  return (
    <div>
      <button onClick={() => setIsSelectingSession(false)}>Go Back</button>
      <p aria-live='polite'>Select a session to join from the list</p>
      <ul>
        {availableSessions.map(s => (
          <li key={s.sessionNum}>
            <button onClick={handleJoinSession(s.sessionNum)}>
              Session {s.sessionNum}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectSession
