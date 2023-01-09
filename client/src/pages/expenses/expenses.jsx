import { useState } from "react";
import { useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const ExpensesList = styled.ul`
display: flex;
justify-content: center;
list-style: none;
border: 1px solid;
width: 500px;
margin: 0 auto;
`;

const ExpenesesListItem = styled.li`
width: 300px;
display: flex;
justify-content: space-between;
`;

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    console.log(process.env.REACT_APP_API_URL);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
            .then(res => res.json())
            .then(data => {
                setExpenses(data);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
        <ExpensesList>
            <form onSubmit={handleExpenseAdd}>
                <input placeholder="type" 
                required 
                onChange={(e) => setType(e.target.value)} 
                value = {type} />

                <input placeholder="amount" 
                type='number' 
                required 
                onChange={(e) => setAmount(e.target.value)}
                value = {amount} />

                <button>Ikelti</button>
            </form>
            {expenses.map((exp) => (
                <ExpenesesListItem key={exp.amount}>
                    <span>{exp.type}</span>
                    <span>{exp.amount}€</span>
                </ExpenesesListItem>
            ))}
        </ExpensesList>
    );
}