import React from 'react';
import { render, fireEvent, getByText } from '@testing-library/react';
import Button from '../atoms/Button';
import '@testing-library/jest-dom/extend-expect';

describe('Button Component', () => {
  it('testando o render do botao', () => {
    const buttonText = 'Click me';
    const mockOnClick = jest.fn();
    
    const { getByText } = render(<Button onClick={mockOnClick}>{buttonText}</Button>);
    
    const button = getByText(buttonText);
    expect(button).toBeInTheDocument();
  });

  it('testando se o onClick funciona', () => {
    const buttonText = 'Click me';
    const mockOnClick = jest.fn();
    
    const { getByText } = render(<Button onClick={mockOnClick}>{buttonText}</Button>);
    
    const button = getByText(buttonText);
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalled();
  });
});
