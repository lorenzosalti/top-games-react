import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DefaultLayout from './layouts/DefaultLayout';
import GlobalContext from './contexts/globalContext';
import SearchLayout from './layouts/SearchLayout';
import DetailPage from './pages/DetailPage';
import PlayStation from './pages/PlayStationPage';
import Xbox from './pages/XboxPage';
import Pc from './pages/PcPage';
import Switch from './pages/SwitchPage';
import Checkout from './pages/CheckOutPage';


function App() {

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('title');

  const [orderByDirection, setOrderByDirection] = useState('ASC');
  const gamesUrl = 'http://localhost:3000/games';
  const navigate = useNavigate();
  const location = useLocation();

  function getGames() {

    axios.get(gamesUrl, { params: { search, orderBy, orderByDirection } })
      .then(res => {
        setGames(res.data);

      })
      .catch(err => console.error(err));
  }


  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const urlSearch = params.get('search') || '';
    const urlOrderBy = params.get('orderBy') || 'title';
    const urlOrderByDirection = params.get('orderByDirection') || 'ASC';

    setSearch(urlSearch);
    setOrderBy(urlOrderBy);
    setOrderByDirection(urlOrderByDirection);
  }, []);


  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (orderBy) params.set('orderBy', orderBy);
    if (orderByDirection) params.set('orderByDirection', orderByDirection);

    if (location.pathname === '/games') {
      navigate(`/games?${params.toString()}`, { replace: true });
    }

    if (location.pathname === '/') {
      setSearch('');
    }

    if (location.pathname === '/games') {
      getGames();
    }

  }, [orderBy, orderByDirection, location.pathname]);



  function searchGames(event) {
    event.preventDefault();
    const params = new URLSearchParams();

    if (search) params.set('search', search);
    if (orderBy) params.set('orderBy', orderBy);
    if (orderByDirection) params.set('orderByDirection', orderByDirection);
    getGames();
    navigate(`/games?${params.toString()}`);
  }


  return (
    <>
      <GlobalContext.Provider value={{ searchGames, search, setSearch, games, orderBy, setOrderBy, orderByDirection, setOrderByDirection }}>
        <Routes>
          <Route element={<SearchLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/games' element={<SearchPage />} />
          </Route>
          <Route element={<DefaultLayout />}>
            <Route path='/games/:id' element={<DetailPage />} />
            <Route path='/console/playstation' element={<PlayStation />} />
            <Route path='/console/xbox' element={<Xbox />} />
            <Route path='/console/pc' element={<Pc />} />
            <Route path='/console/switch' element={<Switch />} />


            {/* riabilitata per poter vedere il checkout a schermo */}
            <Route path='/order' element={<Checkout />} />

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
