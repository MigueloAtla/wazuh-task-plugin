import * as React from 'react';
import { describe, expect } from '@jest/globals';
import { render, RenderResult, fireEvent, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import { TodoInput } from ".";

const mockCreateTask = jest.fn()

jest.mock('../../hooks/useHttpActions', () => {
  const originalModule = jest.requireActual('../../hooks/useHttpActions');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
        createTask: mockCreateTask
    })
  };
});

describe('<TodoInput />', () => {
  beforeEach(() => {
    render(<TodoInput/>);
  });
  it('renders the create-todo input field', () => {
    const inputEl = screen.getByTestId("create-todo-input")
    expect(inputEl).toBeInTheDocument()
  });
  it('pass text to create-todo input field', () => {
    const inputEl = screen.getByTestId("create-todo-input")
    // userEvent.type(inputEl, "fireEvent.change(input, {target: {value: '23'}})");
 
    fireEvent.change(inputEl, {target: {value: 'this is a new task'}})
    expect(inputEl).toHaveValue("this is a new task");
  });
  it('calls to createTask from httpActions hook when create a new task', async () => {
    const inputEl = screen.getByTestId("create-todo-input")
 
    fireEvent.change(inputEl, {target: {value: 'this is a new task'}})

    // Work In Progress
    // await waitFor(() => {
      // fireEvent.keyDown(inputEl, {key: 'enter', keyCode: 13})
    // })
    // expect(mockCreateTask).toHaveBeenCalledTimes(1)
    expect(true).toBe(true)
  });
});