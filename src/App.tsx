import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Paper from './pages/Paper';
import Download from './pages/Download';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/paper" element={<Paper />} />
      <Route path="/paper/:sectionId" element={<Paper />} />
      <Route path="/download" element={<Download />} />
    </Routes>
  );
}

export default App;
