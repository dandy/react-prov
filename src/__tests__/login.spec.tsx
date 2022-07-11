import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../app/store';

describe("Login", () => {
  it('should login with username and password', async () => {
    const {container} = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );

    // Login user with upworkTest/2022 as username/password
    const usernameInput = screen.getByTestId('username');
    fireEvent.change(usernameInput, { target: { value: 'upworkTest' } });
    const passwordInput = screen.getByTestId('password');
    fireEvent.change(passwordInput, { target: { value: '2022' } });
    const submitButton = screen.getByTestId("submit-button");
    fireEvent.click(submitButton);
    await waitForElementToBeRemoved(() => screen.getByTestId('submit-button'));

    // Expect the logged in username to be displayed on Graph page
    const usernameHeadingOnGraphPage = screen.getByTestId('username-heading');
    expect(usernameHeadingOnGraphPage).toBeInTheDocument();
    expect(usernameHeadingOnGraphPage).toHaveTextContent('upworkTest');

    // Expect graph is rendered on page
    const chartArea = container.getElementsByClassName('recharts-wrapper');
    expect(chartArea.length).toEqual(1);

    // Expect the signout button to be present on graph page
    const signout_button = screen.getByTestId('signout-button')
    expect(signout_button).toBeInTheDocument();

  });
});
