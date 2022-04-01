import { mount } from 'enzyme'
import { AuthContext } from '../../auth/authContext'
import { DashboardRoutes } from '../../routers/DashboardRoutes'
import { MemoryRouter } from 'react-router-dom'

describe('pruebas en DashboardRoutes', () => {
  const contextValue = {
    user: {
      logged: true,
      name: 'Franco'
    }
  }

  test('debe mostrarse correctamente - Marvel', () => {
    const wrapper = mount(<AuthContext.Provider value={contextValue}>
                            <MemoryRouter initialEntries={['/']}>
                              <DashboardRoutes />
                            </MemoryRouter>
                          </AuthContext.Provider>)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.text-info').text().trim()).toBe('Franco')
    expect(wrapper.find('h1').text().trim()).toBe('MarvelScreen')
  })

  test('debe mostrarse correctamente de DC', () => {
    const wrapper = mount(<AuthContext.Provider value={contextValue}>
                            <MemoryRouter initialEntries={['/dc']}>
                              <DashboardRoutes />
                            </MemoryRouter>
                          </AuthContext.Provider>)
    console.log(wrapper.html())
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1').text().trim()).toBe('DC Screen')
  })
})
