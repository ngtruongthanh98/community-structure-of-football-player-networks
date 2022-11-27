import './App.scss';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import SalesPage from './pages/Sales';
import Navbar from './components/Navbar';
import NavbarNext from './components/NavBarNext';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavbarNext />

      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
