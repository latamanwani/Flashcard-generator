import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateFlashCard from '../viewpages/CreateFlashCard';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('CreateFlashCard component', () => {
  test('renders the form inputs and buttons', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/group name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Describe the roles, responsibilities, skills required for the job and help candidate understand the role better/i)).toBeInTheDocument();

    expect(screen.getAllByPlaceholderText(/enterTerm/i)).toHaveLength(1);

    expect(screen.getAllByPlaceholderText(/enterDefination/i)).toHaveLength(1);

    expect(screen.getByRole('button', { name: /upload Upload Image/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Add More/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Create/i })).toBeInTheDocument();
  });

  test('submits the form when "Create" button is clicked', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <CreateFlashCard />
      </Provider>
    );
    userEvent.click(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByTestId('create-flash')).toBeInTheDocument();
  });
});
