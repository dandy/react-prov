import { Button, Center, Heading, HStack, Stack } from '@chakra-ui/react'
import React from 'react'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { loggedInUsername, logout } from '../authentication/authenticationSlice'
import { patientsGraphData } from './patientsGraphDataModel'

export default function PatientsGraph() {
    const username: string = useAppSelector(loggedInUsername)
    const dispatch = useAppDispatch();

    return (
        <Center height="100vh" bg="white">
            <Stack spacing={3} boxShadow="lg" rounded="lg" p="20" bg="whiteAlpha.500">
                <Heading data-testid='username-heading' as="h3" size='lg' color="gray.500" textAlign="center">{username}</Heading>
                <LineChart data-testid='charts-area' width={1260} height={450} data={patientsGraphData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" angle={90} height={200} tickMargin={50} interval={0} padding={{ left: 0, right: 0 }} />
                    <YAxis dataKey="value" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
                <HStack justify={'right'}>
                    <Button data-testid='signout-button' size="lg" onClick={(e) => dispatch(logout())} bg="#4D4DB4" color='white'>Signout</Button>
                </HStack>
            </Stack>
        </Center>
    )
}
