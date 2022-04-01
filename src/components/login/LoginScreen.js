import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../auth/authContext'
import { useForm } from '../../hooks/useForm'

import { types } from '../../types/types'

export const LoginScreen = () => {
  const navigate = useNavigate()
  const [{ username }, handleInputChange] = useForm({ username: '' })
  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()

    const action = {
      type: types.login,
      payload: {
        name: username
      }
    }
    dispatch(action)

    const lastPath = localStorage.getItem('lastPath') || '/marvel'

    navigate(lastPath, { replace: true })
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />
      <form onSubmit={handleLogin}>
        <div className="col-6">

          <input className="form-control" name="username" type="text" value={username} onChange={handleInputChange} autoComplete="off"/>
          <button className="btn btn-primary mt-3">
            Login
          </button>
        </div>
      </form>

    </div>
  )
}
