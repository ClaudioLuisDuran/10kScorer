import { useState, Children } from 'react';
import won from '../assets/youwin.avif';
import { Center, Button, Image } from '@chakra-ui/react';

export function MyForm({ point, setPoints, sum, setSum, pointArray, setPointArray }) {

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
};



