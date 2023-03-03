import * as React from 'react';
import {describe, expect, test} from '@jest/globals';
import { render, RenderResult, fireEvent } from '@testing-library/react';
import { CompleteCheckbox } from ".";

let documentBody: RenderResult;

const Wrapper = ({id='1'}) => {
  const [completed, setCompleted] = React.useState(false)
  const handleClick = (id) => {
    if(id === '1') setCompleted(!completed)
  }
  return (
    <CompleteCheckbox completed={completed} id={id} handleSetComplete={() => handleClick(id)} />
  )
}
describe('<CompleteCheckbox />', () => {
  
  it('Toggles button state on click callback', () => {
    documentBody = render(<Wrapper />);

    // set complete to true
    fireEvent.click(documentBody.getByRole('button'))
    expect(documentBody.getByRole('button')).toHaveAttribute('aria-label', 'Complete')
    
    // set complete to false
    fireEvent.click(documentBody.getByRole('button'))
    expect(documentBody.getByRole('button')).toHaveAttribute('aria-label', 'Incomplete')
  });
  it('Doesn\'t toggles button state when id is different from the todo.id', () => {
    documentBody = render(<Wrapper id='2'/>);

    // Shouldn't toggle
    fireEvent.click(documentBody.getByRole('button'))
    expect(documentBody.getByRole('button')).toHaveAttribute('aria-label', 'Incomplete')
  });
});