import React from 'react';
import Forecast from '.';
import { mockForecast } from '../../mocks/forecast';
import { renderWithStore } from '../../mocks/renderWithStore';
import { mockInitialStore } from '../../mocks/store';

describe('<Meta>', () => {
  it('should render loading text', () => {
    const { getByText } = renderWithStore(<Forecast />, {
      ...mockInitialStore,
      forecast: {
        loading: true,
        data: [],
        error: null,
      },
    });
    expect(getByText('Loading ...')).toBeInTheDocument();
  });
  it('should render correct info', () => {
    const { getByTestId, getByText } = renderWithStore(<Forecast />, {
      ...mockInitialStore,
      forecast: {
        loading: false,
        data: mockForecast,
        error: null,
      },
    });
    expect(getByTestId('forecasts')).toBeInTheDocument();
    expect(getByTestId('forecasts').children.length).toEqual(7);
    expect(getByText('Max: 19.4')).toBeInTheDocument();
    expect(getByText('Min: 8')).toBeInTheDocument();
  });
});
