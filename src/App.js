import logo from './logo.svg';
import './App.css';
import Song from './components/Song';
import Genres from './components/Genres';
import Artists from './components/Artists';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='App container'>
          <h3 className='d-flex justify-content-center m-3'>MusicApp</h3>

          <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
            <ul className='navbar-nav'>
              <li className='nav-item- m-1'>
                <NavLink
                  className='btn btn-light btn-outline-primary'
                  to='/songs'
                >
                  Songs
                </NavLink>
              </li>
              <li className='nav-item- m-1'>
                <NavLink
                  className='btn btn-light btn-outline-primary'
                  to='/artists'
                >
                  Artists
                </NavLink>
              </li>
              <li className='nav-item- m-1'>
                <NavLink
                  className='btn btn-light btn-outline-primary'
                  to='/genres'
                >
                  Genres
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/songs' element={<Song />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/genres' element={<Genres />} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
