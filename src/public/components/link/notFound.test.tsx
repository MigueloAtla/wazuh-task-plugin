import * as React from 'react'
import {describe, expect, test} from '@jest/globals';
import { render, RenderResult } from '@testing-library/react';
import NotFound from '.';

let documentBody: RenderResult;

describe('<NotFound />', () => {
  beforeEach(() => {
    documentBody = render(<NotFound />);
  });

  it('shows not found message', () => {
    expect(documentBody.getByText('Not Found')).toBeInTheDocument();
    expect(documentBody.getByText('404')).toBeInTheDocument();
  });
});