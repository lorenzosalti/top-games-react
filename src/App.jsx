import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import DefaultLayout from './layouts/DefaultLayout';
import GlobalContext from './contexts/globalContext';
import SearchLayout from './layouts/SearchLayout';
import WishListPage from './pages/WishListPage';
import DetailPage from './pages/DetailPage';
import PlayStation from './pages/PlayStationPage';
import Xbox from './pages/XboxPage';
import Pc from './pages/PcPage';
import Switch from './pages/SwitchPage';
import Checkout from './pages/CheckOutPage';
import Page404 from './pages/Page404';


function App() {

  const [cartStorage, setCartStorage] = useState(() => {
    const storedCart = sessionStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

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

  const removeFromCart = (gameToRemove) => {
    setCartStorage(prev => prev.filter(game => game.id !== gameToRemove.id));
  };


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

  // inizializza la wishlist con quello che c'è salvato nel sessionStorage
  const [wishListGames, setWishListGames] = useState(() => {
    const stored = sessionStorage.getItem("wishListGames");
    return stored ? JSON.parse(stored) : [];
  });

  // quando viene modificata la wishlist aggiorna il sessionStorage
  useEffect(() => {
    sessionStorage.setItem("wishListGames", JSON.stringify(wishListGames));
  }, [wishListGames]);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cartStorage));
  }, [cartStorage]);

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cartStorage));
  }, [cartStorage]);

  // funzione chiamata dal pulsante per fare un toggle della presenza del gioco nella wishlist
  function toggleWishlist(id) {
    setWishListGames((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
  }

  // funzione di controllo di presenza nella wishlist
  function isInWishlist(id) {
    return wishListGames.includes(id);
  }

  // FUNZIONI E VARIABILI DEDICATE AL CARRELLO E CHECKOUT
  function updateQuantity(gameToUpdate, quantity) {
    const safeQuantity = Math.max(1, Number(quantity));
    setCartStorage(prev => prev.map(game => game.id === gameToUpdate.id ? { ...game, quantity: safeQuantity } : game));
  }

  function reduceQuantityGameCart(gameToUpdate) {
    setCartStorage(prev => {
      const updatedCart = prev
        .map(game => {
          if (game.id === gameToUpdate.id) {
            const newQuantity = game.quantity - 1;
            return newQuantity > 0 ? { ...game, quantity: newQuantity } : null;
          }
          return game;
        })
        .filter(Boolean);
      return updatedCart;
    });
  }

  const grossPrice = cartStorage.reduce((acc, game) => {
    let price = game.discount ? game.price - (game.price * game.discount / 100) : game.price;

    return acc + Number((price * game.quantity).toFixed(2));
  }, 0);


  return (
    <>
      <GlobalContext.Provider value={{ searchGames, search, setSearch, games, orderBy, setOrderBy, orderByDirection, setOrderByDirection, cartStorage, setCartStorage, removeFromCart, wishListGames, setWishListGames, toggleWishlist, isInWishlist, updateQuantity, grossPrice, reduceQuantityGameCart }}>
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
            <Route path='/wishlist' element={<WishListPage />} />


            {/* riabilitata per poter vedere il checkout a schermo */}
            <Route path='/checkout' element={<Checkout />} />

            <Route path='/order/:id' element={<div>Detail Order</div>} />
            <Route path='/mailing-list' element={<div>Mailing-list</div>} />
            <Route path='*' element={<Page404 />} />
          </Route >
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
