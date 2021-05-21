import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Weather from '.';
import { mockSingleWeather } from '../../../mocks/weather';

describe('<Weather>', () => {
    let renderResult: RenderResult;

    it('should render correct info', () => {
        renderResult = render(<Weather {...mockSingleWeather} />);
        const { getByText, getByAltText } = renderResult;
        expect(getByText(`Max: ${mockSingleWeather.max_temp}`)).toBeInTheDocument();
        expect(getByText(`Min: ${mockSingleWeather.min_temp}`)).toBeInTheDocument();
        expect(getByAltText(mockSingleWeather.weather.description).getAttribute('src'))
            .toBe('https://www.weatherbit.io/static/img/icons/c04d.png');
    });
});
