const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const notifStyle = {
    color: 'green',
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
    fontSize: 20
  }

  return (
    <div style={notifStyle}>
      <p>{message}</p>
    </div>
  )
}

export default Notification