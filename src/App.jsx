import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DefaultLayout from './layouts/DefaultLayout';
import GlobalContext from './contexts/globalContext';
import SearchLayout from './layouts/SearchLayout';
import WishListPage from './pages/WishListPage';


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

  // FUNZIONI E VARIABILI DEDICATE ALLA WISHLIST
  const [wishListGames, setWishListGames] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishListGames');
    if (stored) setWishListGames(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("wishListGames", JSON.stringify(wishListGames));
  }, [wishListGames]);

  function toggleWishlist(id) {
    setWishListGames((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
  }

  function isInWishlist(id) {
    return wishListGames.includes(id)
  }




  return (
    <>
      <GlobalContext.Provider value={{ searchGames, search, setSearch, games, orderBy, setOrderBy, orderByDirection, setOrderByDirection, wishListGames, setWishListGames, toggleWishlist, isInWishlist }}>
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
            <Route path='/wishlist' element={<WishListPage />} />
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
