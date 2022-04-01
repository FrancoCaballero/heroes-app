import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext'
import { LoginScreen } from '../../../components/login/LoginScreen'
import { types } from '../../../types/types'

const mockDispatch = jest.fn()
const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('pruebas en LoginScreen', () => {
  const wrapper = mount(
    <AuthContext.Provider value={{ user: { logged: false }, dispatch: mockDispatch }}>
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    </AuthContext.Provider>
  )

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe realizar el dispatch y la navegación', () => {
    wrapper.find('input').simulate('change', { target: { name: 'username', value: 'Pedro' } })
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: 'Pedro' }
    })

    expect(mockNavigate).toHaveBeenCalledWith('/marvel', { replace: true })

    localStorage.setItem('lastPath', '/dc')
    wrapper.find('form').simulate('submit', { preventDefault: () => {} })

    expect(mockNavigate).toHaveBeenCalledWith('/dc', { replace: true })
  })
})
