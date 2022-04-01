import { authReducer } from '../../auth/authReducer'
import { types } from '../../types/types'

describe('pruebas en authReducer', () => {
  test('debe retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {})
    expect(state).toEqual({ logged: false })
  })

  test('debe autenticar y colocar el name del usuario', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Franco'
      }
    }
    const state = authReducer({ logged: false }, action)

    expect(state).toEqual({ logged: true, name: 'Franco' })
  })

  test('debe borrar el name del usuario y logged en false', () => {
    const action = {
      type: types.logout
    }
    const state = authReducer({ logged: true, name: 'Franco' }, action)

    expect(state).toEqual({ logged: false })
  })
})
