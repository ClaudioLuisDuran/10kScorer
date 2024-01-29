import { useState, Children } from 'react';
import { Center, Text, Container, Button, 
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
  Alert, AlertIcon, Image } from '@chakra-ui/react';
import '../css/App.css';
import won from '../assets/youwin.avif';
import tenk from '../assets/10k.jpg';
import dado from '../assets/dadoanimated.gif'

const Home =() =>{
    return(
        <>
<div id="divOK">
<Center><Container boxShadow='lg' maxW='md' bg='blue.600' color='white' p={3} rounded='lg' m={7}>
  <Center><Text fontSize='3xl'>10K SCORER FOR 3 GAMERS</Text></Center>
  <Text fontSize="xl" fontStyle="italic" mt="5">
      Each player takes turns rolling a 6-sided die and accumulating points. The first player to reach 10,000 points wins.
    </Text>
  <Image src={tenk} ></Image>
</Container></Center>
<Center>
  {players.map(player => (
    <div key={player.id}>
      <TableContainer p={3} boxShadow='lg' >
        <Table colorScheme='gray' >
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
          <Tfoot color='red'>
            <tr>
              <td bgcolor="yellow"><Center>Total: {player.sum}</Center></td>
            </tr>
          </Tfoot>
        </Table>
      </TableContainer>
      {player.sum === 10000 && (
        <td><Alert status="success">
          <AlertIcon />
          {player.name}, you have won the game!!!! Congratulations!!!
        </Alert></td>
      )}
    </div>

  ))}
</Center>
</div>
</>
)
};
export default Home;