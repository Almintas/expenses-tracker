import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";


export const Login = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        isLoading(true);
        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json()
                }

                throw new Error('Test error');
            })
            .then(data => {
                onSuccess(data);
                setIsLoading(false);
            })
            .catch((e) => {
                setError(String(e));
                setIsLoading(false);
            })
    }

    return (
        <>
            <form onSubmit={handleLogin}>
                <Input placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    disabled={isLoading} />

                <Input placeholder="Password"
                    required
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    disabled={isLoading} />

                {error && <div>{error}</div>}

                <Button disabled={isLoading}>LOG IN</Button>
            </form>
            <Link to='/register'>Register</Link>
        </>
    )
};