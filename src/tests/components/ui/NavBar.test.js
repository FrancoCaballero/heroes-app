import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../auth/authContext'
import { NavBar } from '../../../components/ui/NavBar'
import { types } from '../../../types/types'

const mockNavigate = jest.fn()
const mockDispatch = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))
const wrapper = mount(
  <AuthContext.Provider value={{ user: { name: 'Pedro', logged: true }, dispatch: mockDispatch }}>
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  </AuthContext.Provider>
)

describe('pruebas en NavBar', () => {
  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.text-info').text().trim()).toBe('Pedro')
  })

  test('debe llamar el logout, llamar el navigate y el dispatch con los argumentos', () => {
    wrapper.find('button').simulate('click')
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true })
    expect(mockDispatch).toHaveBeenCalledWith({ type: types.logout })
  })
})
