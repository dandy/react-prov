import { Button, Center, FormControl, FormHelperText, Heading, Input } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Layout from '../../common/layout';
import { login, UserLoginData, isLoggedIn, loginError } from './authenticationSlice';

export default function LoginForm() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [validationError, setValidationError] = useState<string | null>(null);
    const isAuthenticated = useAppSelector(isLoggedIn);
    const isError = useAppSelector(loginError);

    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) return;
        navigate("/dashboard")
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isError) return;
        setValidationError('Wrong password or username, please try again');
    }, [isError]);

    const dispatch = useAppDispatch();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const loginUser: UserLoginData = { username, password };
        dispatch(login(loginUser));
    }

    return (
        <Center height="100vh" bg="white">
            <form onSubmit={(e) => handleSubmit(e)}>
                <Layout>
                    <Stack spacing={3} boxShadow="lg" rounded="lg" p="40" bg="whiteAlpha.500">
                        <Heading as="h3" size='lg' color="gray.500" textAlign="center">Sign in</Heading>
                        <FormControl>
                            <Input id='username' data-testid='username' type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input id='password' data-testid='password' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                            {validationError != null && <FormHelperText color='#EF0000'>{validationError}</FormHelperText>}
                        </FormControl>

                        <Button data-testid='submit-button' type='submit' bg="#4D4DB4" color='white'>Sign in</Button>
                    </Stack>
                </Layout>
            </form>
        </Center >
    )
}
