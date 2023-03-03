import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { DeleteButton } from ".";

let documentBody: RenderResult;

const todo = {
  id: '1',
  completed: false,
  created_at: '2021-08-01T00:00:00.000Z',
  priority: 1,
  tags: ['tag1', 'tag2'],
  text: 'test',
  finished_date: '2021-08-01T00:00:00.000Z',
  completed_at: '2021-08-01T00:00:00.000Z'
}

const handleClick = jest.fn()
describe('<DeleteButton />', () => {
  beforeEach(() => {
    documentBody = render(<DeleteButton todo={todo} handleDelete={handleClick} />);
  });

  it('Renders a button', () => {
    expect(documentBody.getByRole('button')).toBeInTheDocument()
  });

  it('Calls handleDelete when clicked', () => {
    fireEvent.click(documentBody.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  });
});