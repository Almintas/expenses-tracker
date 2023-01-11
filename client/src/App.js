import './App.css';
import { Expenses } from './pages/expenses/expenses';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Login } from './pages/Login/Login';
import { useState } from 'react';
import { Register } from './pages/Register/Register';

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route path='/'element={<PageLayout user={user} />}>
          <Route index element={<Expenses />} />
        </Route>
        <Route path='/login' element={<Login onSuccess={handleLoginSuccess} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
