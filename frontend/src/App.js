import './App.scss';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import OverviewPage from './pages/Overview';
import CommunitiesPage from './pages/Communities';
import ManagementPage from './pages/Management';
// import Navbar from './components/Navbar';
import NavbarNext from './components/NavBarNext';
import { Routes, Route } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { connect } from 'react-redux';

function App(props) {
  return (
    <div className="App">
      <NavbarNext />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  initalState: state,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
