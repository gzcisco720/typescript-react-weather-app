import React from 'react';
import Current from '.';
import { mockCurrent } from '../../mocks/current';
import { renderWithStore } from '../../mocks/renderWithStore';
import { mockInitialStore } from '../../mocks/store';

describe('<Current>', () => {
  it('should render loading text', () => {
    const { getByText } = renderWithStore(<Current />, {
      ...mockInitialStore,
      current: {
        loading: true,
        data: null,
        error: null,
      },
    });
    expect(getByText('Loading ...')).toBeInTheDocument();
  });
  it('should render correct info', () => {
    const { getByText } = renderWithStore(<Current />, {
      ...mockInitialStore,
      current: {
        loading: false,
        data: mockCurrent,
        error: null,
      },
    });
    expect(getByText('Clear sky')).toBeInTheDocument();
    expect(getByText('Melbourne, AU')).toBeInTheDocument();
  });
  it('should render 00.0 when data is nil', () => {
    const { getByText } = renderWithStore(<Current />, {
      ...mockInitialStore,
      current: {
        loading: false,
        data: null,
        error: null,
      },
    });
    expect(getByText('00.0')).toBeInTheDocument();
  });
});
