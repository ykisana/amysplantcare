// imports the css file that has all the styles for the app
import './App.css';
// imports the router components
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// imports the pages of app
import HomePage from './pages/HomePage';
import JadePlantPage from './pages/JadePlantPage';
import SpiderPlantPage from './pages/SpiderPlantPage';
import BasilPlantPage from './pages/BasilPlantPage';

//main app component
export default function MyApp() {
  return (
    // Define the routes for each page
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basil" element={<BasilPlantPage />} />
        <Route path="/spider" element={<SpiderPlantPage />} />
        <Route path="/jade" element={<JadePlantPage />} />
      </Routes>
    </Router>
  );
}
