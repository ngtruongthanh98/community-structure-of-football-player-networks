import './App.scss';
import HomePage from './pages/Home';
import SalesPage from './pages/Sales';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
