import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import GlobalContext from '../contexts/globalContext';
import WishlistButton from "../components/WishListButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons";
import Card from "../components/Card";


function WishListPage() {
  const { wishListGames, setWishListGames, cartStorage, reduceQuantityGameCart, setCartStorage } = useContext(GlobalContext);

  // necessaria perchè il games in contesto globale potrebbe essere filtrato, ma è sempre necessario fare un confronto tra TUTTI i giochi
  const [games, setGames] = useState([]);

  const gamesUrl = 'http://localhost:3000/games';

  // chiamata per recuperare TUTTI i giochi
  useEffect(() => {
    axios.get(gamesUrl)
      .then(res => {
        setGames(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  // verifica della presenza di giochi nella wishlist, viene ricalcolato sempre e solo quando [games, wishListGames] sono modificati
  // useMemo serve a sostituire il lavoro di useEffect + useState
  const gamesInWishlist = useMemo(() => {
    if (!games.length || !wishListGames.length) return [];
    return games.filter(game => wishListGames.includes(Number(game.id)));
  }, [games, wishListGames]);

  function addGameCart(game) {
    const existingGameIndex = cartStorage.findIndex(g => g.id === game.id);

    let updatedCart;

    if (existingGameIndex !== -1) {
      updatedCart = [...cartStorage];
      updatedCart[existingGameIndex].quantity += 1;
    } else {
      updatedCart = [...cartStorage, { ...game, quantity: 1 }];
    }

    setCartStorage(updatedCart);
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center text-white m-3">
          <h2 className="fs-1">La tua wishlist:</h2>
        </div>

        {gamesInWishlist.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center text-white my-5" style={{ minHeight: '200px' }}>
            <div className="text-center text-warning fs-1"><FontAwesomeIcon icon={faFaceFrown} />
              <h3 className="text-center text-white">La tua wishlist è vuota!</h3></div>
          </div>
        ) : (
          <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
            {gamesInWishlist.map(game => <Card data={game} key={game.id} />)}
          </div>
        )}
      </div>
    </>
  );
}

export default WishListPage;