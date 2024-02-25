import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Client } from './Pages/Client';
import './main.css'

export default function App() {
  return (
    <Router>
      <Client />
    </Router>
  );
}
