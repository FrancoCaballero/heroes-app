import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'
import { SearchScreen } from '../../../components/search/SearchScreen'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}))

describe('pruebas en SearchScreen', () => {
  test('debe mostrarse correctamente', () => {
    const wrapper = mount(
                    <MemoryRouter initialEntries={['/']}>
                      <SearchScreen />
                    </MemoryRouter>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search hero')
  })

  test('debe mostrar a batman y el input con el valor del queryString', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    )

    expect(wrapper.find('input').prop('value')).toBe('batman')
    expect(wrapper).toMatchSnapshot()
  })

  test('debe mostrar un error si no se encuentra el hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman134']}>
        <SearchScreen />
      </MemoryRouter>
    )

    expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados: batman134')
  })

  test('debe llamar el navigate a la nueva pantalla', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    )

    wrapper.find('input').simulate('change', { targer: { name: 'searchText', value: 'batman' } })
    wrapper.find('form').prop('onSubmit')({ preventDefault: () => {} })

    expect(mockNavigate).toHaveBeenCalledWith('?q=batman')
  })
})
