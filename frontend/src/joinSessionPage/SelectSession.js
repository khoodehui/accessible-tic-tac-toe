import { useState, useEffect } from 'react'
import services from '../services'

const SelectSession = ({ setIsSelectingSession }) => {
  const [availableSessions, setAvailableSessions] = useState([])

  useEffect(() => {
    services.getAvailableSessions().then(res => {
      setAvailableSessions(res)
    })
  }, [])

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
            <button>
              Session {s.sessionNum}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SelectSession
