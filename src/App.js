import { Routes, Route } from 'react-router-dom';
import Invoices from './pages/Invoices';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Invoices />} />
      </Routes>
    </div>
  );
}

export default App;
