import { useState } from 'react'
import SelectSession from './SelectSession'

const JoinSessionPage = ({ playerName, createSession }) => {
  const handleCreateSession = () => createSession({ creatorName: playerName })
  const [isSelectingSession, setIsSelectingSession] = useState(false)

  if (!isSelectingSession) {
    return (
      <div>
        <p aria-live='polite'>
          Hello {playerName}, would you like to create a game session, or join
          one?
        </p>
        <button onClick={handleCreateSession}>Create a Session</button>
        <button onClick={() => setIsSelectingSession(true)}>Join a Session</button>
      </div>
    )
  }

  return <SelectSession setIsSelectingSession={setIsSelectingSession} />
}

export default JoinSessionPage
