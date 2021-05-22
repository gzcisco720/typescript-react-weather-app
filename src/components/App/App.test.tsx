import App from '.';
import { renderWithStore } from '../../mocks/renderWithStore';
import * as hooks from './hooks';

describe('<App />', () => {
  it('should call hooks', () => {
    const useHandleSearchChange = jest
      .spyOn(hooks, 'useHandleSearchChange')
      .mockImplementation(() => ({
        searchCity: 'Melbourne, AU',
        handleSearchChange: jest.fn(),
      }));
    renderWithStore(<App />);
    expect(useHandleSearchChange).toBeCalled();
  });
  it('should render correct value into input element', () => {
    jest.spyOn(hooks, 'useHandleSearchChange').mockImplementation(() => ({
      searchCity: 'Melbourne, AU',
      handleSearchChange: jest.fn(),
    }));
    const { getByTestId } = renderWithStore(<App />);
    const searchInput = getByTestId('searchCity');
    expect((searchInput as HTMLInputElement).value).toEqual('Melbourne, AU');
  });
});
