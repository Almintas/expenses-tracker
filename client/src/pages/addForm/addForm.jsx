import { useState } from "react";
import styled from "styled-components";

const InputStyle = styled.input`
margin-right: 10px;
margin-top: 20px;
border-radius: 10px;
padding: 6px;
`;

const ButtonStyle = styled.button`
display: flex;
justify-content: center;
margin: 0 auto;
margin-top: 10px;
width: 100px;
background-color: blue;
color: white;
`;

export const AddForm = () => {
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [setExpenses] = useState([]);

    const handleExpenseAdd = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type, amount, userId: 1
            })
        })
        .then(res => res.json())
        .then(data => {
            setExpenses(data);
            setType('');
            setAmount('');
        });
    }

    return (
        <form onSubmit={handleExpenseAdd}>
            <InputStyle placeholder="type"
                required
                onChange={(e) => setType(e.target.value)}
                value={type} />

            <InputStyle placeholder="amount"
                type='number'
                required
                onChange={(e) => setAmount(e.target.value)}
                value={amount} />

            <ButtonStyle>Ikeli</ButtonStyle>
        </form>
    )
};