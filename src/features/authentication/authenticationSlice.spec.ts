import counterReducer, {
    AuthenticationState,
    logout,
} from './authenticationSlice';

describe('counter reducer', () => {
    const initialState: AuthenticationState = {
        isLoggedIn: false,
        username: '',
        loginError: false
    };
    it('should handle initial state', () => {
        expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
            isLoggedIn: false,
            username: '',
            loginError: false
        });
    });

    it('should handle user logout', () => {
        const actual = counterReducer(initialState, logout());
        expect(actual.isLoggedIn).toEqual(false);
        expect(actual.username).toEqual('');
    });
});
