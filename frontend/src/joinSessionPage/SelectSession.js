import { useState, useEffect } from 'react'
import appService from '../services'

const SelectSession = ({
  handleCreateSession,
  setIsSelectingSession,
  joinSession,
}) => {
  const [availableSessions, setAvailableSessions] = useState(null)

  const handleJoinSession = sessionNum => () => joinSession(sessionNum)

  const handleGetAvailableSessions = () => {
    appService.getAvailableSessions().then(res => {
      setAvailableSessions(res)
    })
  }

  useEffect(handleGetAvailableSessions, [])

  if (availableSessions === null) {
    return 'loading'
  }
  if (availableSessions.length === 0) {
    return (
      <div>
        <button onClick={() => setIsSelectingSession(false)}>Go Back</button>
        <p aria-live='polite'>
          No available sessions can be found. Would you like to create a session
          or refresh the page?
        </p>
        <button onClick={handleCreateSession}>Create a Session</button>
        <button onClick={handleGetAvailableSessions}>Refresh</button>
      </div>
    )
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
