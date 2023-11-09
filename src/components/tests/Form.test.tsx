import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
const axios = require('axios');
import Form from '../molecules/Form';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('axios');

describe('Form Component', () => {
  it('testando os alertas e os campos', () => {
    const { getByText, getByLabelText } = render(<Form />);
    
    expect(getByLabelText('Nome:')).toBeInTheDocument();
    expect(getByLabelText('Apelido:')).toBeInTheDocument();
    
    expect(getByText('Nome inválido')).toBeInTheDocument();
    expect(getByText('Apelido inválido')).toBeInTheDocument();
  });

  it('testando as entradas dos campos', () => {
    const { getByLabelText, getByText } = render(<Form />);

    const nomeInput = getByLabelText('Nome:') as HTMLInputElement;
    fireEvent.change(nomeInput, { target: { value: '123' } });

    expect(getByText('Nome inválido')).toBeInTheDocument();
  });

  it('testando quando o formulario for invalido', async () => {
    const { getByLabelText, getByText } = render(<Form />);
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const cadastrarButton = getByText('Cadastrar');
    fireEvent.click(cadastrarButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled(); 
      expect(mockedAxios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    });
  });

  it('testando os erros de detalhes do endereco', async () => {
    const { getByLabelText, getByText } = render(<Form />);
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    const cepInput = getByLabelText('CEP:') as HTMLInputElement;
    fireEvent.change(cepInput, { target: { value: '12345678' } });

    const cadastrarButton = getByText('Cadastrar');
    fireEvent.click(cadastrarButton);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(mockedAxios.get).toHaveBeenCalledWith('https://viacep.com.br/ws/12345678/json/');
    });
  });
});
