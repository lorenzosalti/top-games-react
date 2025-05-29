import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage'
import DefaultLayout from './layouts/DefaultLayout';
import GlobalContext from './contexts/globalContext';
import SearchLayout from './layouts/SearchLayout';


function App() {


  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const gamesUrl = 'http://localhost:3000/games'
  const navigate = useNavigate();
  function getGames() {
    axios.get(gamesUrl, { params: { search } })
      .then(res => {
        setGames(res.data)

      })
      .catch(err => console.error(err))
  }

  useEffect(getGames, []);


  function searchGames(event) {
    event.preventDefault();
    getGames();
    navigate('/games')
    setSearch('')

  }


  return (
    <>
      <GlobalContext.Provider value={{ searchGames, search, setSearch, games }}>
        <Routes>
          <Route element={<SearchLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/games' element={<SearchPage />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path='/games/:id' element={<div>Detail Game</div>} />
            <Route path='/console/playstation' element={<div>Console:play</div>} />
            <Route path='/console/xbox' element={<div>Console:xbox</div>} />
            <Route path='/console/pc' element={<div>Console:pc</div>} />
            <Route path='/console/switch' element={<div>Console:switch</div>} />
            {/* <Route path='/order' element={<div>Orders</div>} /> */}
            <Route path='/order/:id' element={<div>Detail Order</div>} />
            <Route path='/mailing-list' element={<div>Mailing-list</div>} />
            <Route path='*' element={<div>Error Page dont exist</div>} />
          </Route >
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
