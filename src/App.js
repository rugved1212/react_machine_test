import './App.css';
import Popular_Page from './pages/navbar';
import Popular from './pages/js/popular';
import Upcoming from './pages/js/upcoming';
import Toprated from './pages/js/toprated';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './pages/js/movie_detail';

function App() {
  return (
    <Router>
      <div>
          <Popular_Page />
          <Routes>
              <Route path="/" element={<Popular />} />
              <Route path="/upcoming" element={<Upcoming />} />
              <Route path="/toprated" element={<Toprated />} />
              <Route path="/movie/:id" element={<MovieDetail/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
