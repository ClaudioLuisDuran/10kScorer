import { useState, Children } from 'react';
import { Center, Text, Container, Button, 
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer,
  Alert, AlertIcon, Image } from '@chakra-ui/react';
import './css/App.css';
import won from './assets/youwin.avif';
import tenk from './assets/10k.jpg';
import dado from './assets/dadoanimated.gif'

function MyForm({ point, setPoints, sum, setSum, pointArray, setPointArray }) {
  const [inputValue, setInputValue] = useState(point.toString());
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPoint = parseInt(inputValue);
    
    if ((pointArray.length === 0 && newPoint < 750)) {
      alert("You haven't entered the game yet! In order to start the game you must have 750 points or more. Try it next turn.");
      return;
    }
    if ((sum + newPoint) > 10000) {
      alert("His play exceeds 10,000 points. You must add the necessary points to reach exactly 10,000 if you want to win.");
      return;
    }
    setPoints(parseInt(inputValue));
    setInputValue("50"); // Limpiar el valor del input después de presionar el botón
    setSum(sum + parseInt(inputValue)); // Suma `inputValue` al total en `sum`
    // Agrega `inputValue` al array pointArray:
    setPointArray([...pointArray, parseInt(inputValue)]);
    
    if (sum === 10000) {
      alert(", You have won the game!!!! Congratulations!!!");
    }
  };

  return (
    <form onSubmit={handleSubmit} key={point}>
      <table border="1"  >
        <thead>
          {sum > 0 && (
            <tr>
              {sum != 10000 && (
                <th><Center>Previous plays</Center></th>
              )}
            </tr>
          )}
        </thead>
        <tbody >
          {pointArray.map((value, index) => (
            <tr key={index} >
              {sum != 10000 && (
                <td><Center>{value}</Center></td>
              )}
            </tr>
          ))}
          <tr color='gray'>
            {sum != 10000 && (
              <th >Next play</th>
            )}
          </tr>
          <tr><td><Center>{sum === 10000 && (
            <Image boxSize='200px' src={won} alt='Winner'></Image>
          )}</Center></td></tr>
        </tbody>
      </table>
      <label>
        {sum != 10000 && (
          <input type="number" value={inputValue} onChange={handleInputChange} step="50" min="50" max="10000" />
        )}
      </label>
      {sum != 10000 && (
        <Button type="submit" colorScheme='teal'>Add</Button>
      )}
    </form>
  );
}

export default function RowList({ pointArray }) {
  return (
    <div className="RowList">
      {Children.map(pointArray, child =>
        <div className="Row">
          {child}
        </div>
      )}
    </div>
  );
}

export function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", point: 50, sum: 0, pointArray: []},
    { id: 2, name: "Player 2", point: 50, sum: 0, pointArray: []},
    { id: 3, name: "Player 3", point: 50, sum: 0, pointArray: []},
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
          return { ...player, point: parseInt(inputValue), sum: newSum, pointArray: newPointArray, counter};
        }
        
        return player;
      });
    });
  };

  return (
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
  );
}