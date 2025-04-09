import PropTypes from 'prop-types'

const Login = props => {
  return (
    <form onSubmit={props.onSubmit}>
      <h2>{props.header}</h2>
      <div>
          username <input data-testid="username" name="username" type="text" value={props.username} onChange={props.onChangeUsername} />
      </div>
      <div>
          password <input data-testid="password" name="password" type="password" value={props.password} onChange={props.onChangePassword} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onChangePassword: PropTypes.func.isRequired,

}

export default Login