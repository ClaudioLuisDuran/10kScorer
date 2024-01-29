import { useState } from 'react';
import {
    Center, Text, Container, Button,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
    Alert, AlertIcon, Image
} from '@chakra-ui/react';
import dado from '../assets/dadoanimated.gif';
import tenk from '../assets/10k.jpg';
import { MyForm } from '../components/MyForm';

export function Home() {

    const [players, setPlayers] = useState([
        { id: 1, name: "Player 1", point: 50, sum: 0, pointArray: [] },
        { id: 2, name: "Player 2", point: 50, sum: 0, pointArray: [] },
        { id: 3, name: "Player 3", point: 50, sum: 0, pointArray: [] },
    ]);
    const [counter, setCounter] = useState(1);
    const handleClick = () => {
        setCounter((prevCounter) => (prevCounter % 3) + 1);
    };

    const handlePlayerFormSubmit = (playerId, inputValue) => {

        setPlayers(prevPlayers => {
            return prevPlayers.map(player => {
                if (player.id === playerId) {
                    const newPointArray = [...player.pointArray, parseInt(inputValue)];
                    const newSum = player.sum + parseInt(inputValue);
                    return { ...player, point: parseInt(inputValue), sum: newSum, pointArray: newPointArray, counter };
                }

                return player;
            });
        });
    };


    return (
        <div id="divOK">
            <Center><Container boxShadow='lg' maxW='md' bg='blue.600' color='white' p={3} rounded='lg' m={7} >
                <Center><Text fontSize='3xl'>10K SCORER FOR 3 GAMERS</Text></Center>
                <Text fontSize="xl" fontStyle="italic" mt="5">
                    Each player takes turns rolling a 6-sided die and accumulating points. The first player to reach 10,000 points wins.
                </Text>
                <Image src={tenk} ></Image>
            </Container></Center>
            <Center>
                {players.map(player => (
                    <div key={player.id} display='flex'>
                        <TableContainer p={1} boxShadow='lg' >
                            <Table colorScheme='gray' boxShadow='md' >
                                <Thead>
                                    <Tr>
                                        <Th bg='blue.400' color='black' ><Center>{player.name}
                                            <Image src={dado} boxSize='50px' m={2}></Image>
                                        </Center></Th>
                                    </Tr>
                                </Thead>
                                <Tbody bgcolor="white">
                                    <Tr>
                                        <Td>
                                            <Center><MyForm
                                                point={player.point}
                                                name={player.name}
                                                setPoints={(inputValue) => handlePlayerFormSubmit(player.id, inputValue)}
                                                sum={player.sum}
                                                setSum={(newSum) =>
                                                    setPlayers(prevPlayers => {
                                                        return prevPlayers.map(p => {
                                                            if (p.id === player.id) {
                                                                return { ...p, sum: newSum };
                                                            }
                                                            return p;
                                                        });
                                                    })
                                                }
                                                pointArray={player.pointArray}
                                                setPointArray={(newPointArray) =>
                                                    setPlayers(prevPlayers => {
                                                        return prevPlayers.map(p => {
                                                            if (p.id === player.id) {
                                                                return { ...p, pointArray: newPointArray };
                                                            }
                                                            return p;
                                                        });
                                                    })
                                                }
                                            /></Center>
                                        </Td>
                                    </Tr>
                                </Tbody>
                                <Tfoot color='white' >
                                    <tr>
                                        <td bgcolor="black"><Center as='b'>Total: {player.sum}</Center></td>
                                    </tr>
                                </Tfoot>
                            </Table>
                        </TableContainer>
                        {player.sum === 10000 && (
                            <>
                                <td><Alert status="success">
                                    <AlertIcon />
                                    {player.name}, you have won the game!!!! Congratulations!!!
                                </Alert></td>
                            </>
                        )}
                    </div>
                ))}
            </Center>
        </div>
    );
}