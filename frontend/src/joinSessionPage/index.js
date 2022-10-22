const JoinSessionPage = ({ playerName, createSession }) => {
  const handleCreateSession = () => createSession({ creatorName: playerName })

  return (
    <div>
      <p aria-live='polite'>
        Hello {playerName}, would you like to create a game session, or join
        one?
      </p>
      <button onClick={handleCreateSession}>Create a Session</button>
    </div>
  )
}

export default JoinSessionPage
