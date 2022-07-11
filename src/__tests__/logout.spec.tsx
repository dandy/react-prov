import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../app/store';

describe("Logout", () => {
    it('should logout user and redirect to Login page', async () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
            </BrowserRouter>
        );

        const usernameInput = screen.getByTestId('username');
        fireEvent.change(usernameInput, { target: { value: 'upworkTest' } });
        const passwordInput = screen.getByTestId('password');
        fireEvent.change(passwordInput, { target: { value: '2022' } });

        const submitButton = screen.getByTestId("submit-button");
        fireEvent.click(submitButton);

        await waitForElementToBeRemoved(() => screen.getByTestId('submit-button'));

        const signout_button = screen.getByTestId('signout-button')
        expect(signout_button).toBeInTheDocument();

        // Signout the user
        fireEvent.click(signout_button);

        // Expect to be on Login page after logout
        const signInButton = screen.getByTestId("submit-button");
        expect(signInButton).toBeInTheDocument();

    });
})