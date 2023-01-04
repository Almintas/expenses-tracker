import { useState } from "react";
import { useEffect } from "react";
import { API_URL, LOGGED_IN_USER } from "../../constants/constants";
import styled from 'styled-components';

const ExpensesList = styled.ul`
display: inline-block;
list-style: none;
border: 1px solid;
`;

const ExpenesesListItem = styled.li`
display: flex;
gap: 10px;
`;

export const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/expenses?userId=${LOGGED_IN_USER.id}`)
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