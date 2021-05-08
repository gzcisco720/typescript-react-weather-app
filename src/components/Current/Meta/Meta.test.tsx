import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Meta from './Meta';

describe('<Meta>', () => {
    let renderResult: RenderResult;

    const props = {
        title: "HUMIDITY",
        value: 12,
    }

    beforeEach(() => {
        renderResult = render(<Meta {...props} />);
    });

    it('should render day', () => {
        const { getByText } = renderResult;

        expect(getByText(props.title)).toBeInTheDocument();
        expect(getByText(props.value)).toBeInTheDocument();
    });
})
