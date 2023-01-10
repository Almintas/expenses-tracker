import { useState } from "react";


export const Login = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACY_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, password
            })
        })
        .then(res => res.json())
        .then(data => {
            onSuccess(data);
        })
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <form onSubmit={handleLogin}>
            <input placeholder="Name" 
            required
            onChange={(e) => setName(e.target.value)}
            value = {name}/>

            <input placeholder="Password" 
            required 
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button>Log In</button>
        </form>
    )
};