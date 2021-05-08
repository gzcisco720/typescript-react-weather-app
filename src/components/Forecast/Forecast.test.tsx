import * as React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Forecast from './Forecast';

describe('<Meta>', () => {
    let renderResult: RenderResult;

    const props = {
        forecastState: {
            loading: false,
            data: [],
            error: null
        }
    }

    it('should render loading text', () => {
        props.forecastState.loading = true
        renderResult = render(<Forecast forecastState={props.forecastState} />);
        const { getByText } = renderResult;
        expect(getByText("Loading ...")).toBeInTheDocument();
    });
});
