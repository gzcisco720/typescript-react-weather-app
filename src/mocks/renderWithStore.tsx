import { Provider } from 'react-redux';
import { IStore } from '../common/interfaces/IStore';
import { mockInitialStore } from './store';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';

const mockStore = configureStore();

export const renderWithStore = (
  component: JSX.Element,
  state: IStore = mockInitialStore,
) => render(<Provider store={mockStore(state)}>{component}</Provider>);
