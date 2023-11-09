import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../atoms/Input';
import '@testing-library/jest-dom/extend-expect';

describe('Input Component', () => {
  it('testando o render do input e do label', () => {
    const mockTipo = 'text';
    const mockValue = 'testuser';
    const mockSetValue = jest.fn();
    const mockOnBlur = jest.fn();

    const { getByLabelText, getByDisplayValue } = render(
      <Input tipo={mockTipo} value={mockValue} setValue={mockSetValue} onBlur={mockOnBlur} />
    );

    const inputElement = getByDisplayValue(mockValue);
    expect(inputElement).toBeInTheDocument();
  });

  it('verificando se o setValue está funcionando devidamente', () => {
    const mockTitulo = 'Password';
    const mockTipo = 'password';
    const mockValue = 'testpassword';
    const mockSetValue = jest.fn();
    const mockOnBlur = jest.fn();

    const { getByDisplayValue } = render(
      <Input titulo={mockTitulo} tipo={mockTipo} value={mockValue} setValue={mockSetValue} onBlur={mockOnBlur} />
    );

    const inputElement = getByDisplayValue(mockValue);
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { value: 'newpassword' } });

    expect(mockSetValue).toHaveBeenCalledWith('newpassword');
  });

  it('verificando se o onBlur funciona', () => {
    const mockTitulo = 'Email';
    const mockTipo = 'email';
    const mockValue = 'test@example.com';
    const mockSetValue = jest.fn();
    const mockOnBlur = jest.fn();

    const { getByDisplayValue } = render(
      <Input titulo={mockTitulo} tipo={mockTipo} value={mockValue} setValue={mockSetValue} onBlur={mockOnBlur} />
    );

    const inputElement = getByDisplayValue(mockValue);
    expect(inputElement).toBeInTheDocument();

    fireEvent.blur(inputElement);

    expect(mockOnBlur).toHaveBeenCalled();
  });
});
