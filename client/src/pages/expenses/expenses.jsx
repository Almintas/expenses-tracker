import { useState } from "react";
import { useEffect } from "react";
import { LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const ExpensesList = styled.ul`
display: flex;
flex-direction: column;
gap: 8px;
list-style: none;
`;

const ExpenesesListItem = styled.li`
align-items: center;
border-radius: 10px;
box-shadow: 0 5px 7px -1px rgb(51 51 51 / 23%);
display: flex;
justify-content: space-between;
padding: 10px 30px;
`;

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <ExpensesList>
            {expenses.map((exp) => (
                <ExpenesesListItem key={exp.amount}>
                    <span>{exp.type}</span>
                    <span>{exp.amount}€</span>
                </ExpenesesListItem>
            ))}
        </ExpensesList>
    );
}