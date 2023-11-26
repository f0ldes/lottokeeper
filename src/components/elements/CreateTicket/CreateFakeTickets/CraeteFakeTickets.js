import { TextField, Button } from "@mui/material";

const CreateFakeTickets = ({numbersArray, setNumbersArray, counter, setCounter}) => {

    const handleInputChange = (event) => {
        setCounter(event.target.value);
    };

    const generateArrayOfNumbers = () => {
        let howManySets = parseInt(counter);

        const newGeneratedNumbers = Array.from({ length: howManySets }, () =>
            Array.from({ length: 5 }, () => Math.floor(Math.random() * 39) + 1).map(String)
        );
        setNumbersArray(newGeneratedNumbers);
    };

    return (
        <div>
            <TextField value={counter} onChange={handleInputChange} variant='standard' />
            <Button fullWidth onClick={generateArrayOfNumbers}>Generate Numbers</Button>
            {
                numbersArray && numbersArray.map((array, index) => (
                    <p key={index}>{array.join(', ')}</p>  // Implicit return
                ))
            }
        </div>
    )
};

export default CreateFakeTickets;