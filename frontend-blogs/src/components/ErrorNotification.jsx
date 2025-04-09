const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  const errorStyle = {
    color: 'red',
    borderStyle: 'solid',
    borderRadius: 2,
    padding: 10,
    marginBottom: 10,
    fontSize: 20
  }

  return (
    <div style={errorStyle}>
      <p>{message}</p>
    </div>
  )
}

export default ErrorNotification