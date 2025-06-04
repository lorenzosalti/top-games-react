import { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import GlobalContext from '../contexts/globalContext';
import WishlistButton from "../components/WishListButton";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";


function WishListPage() {

  const { wishListGames, setWishListGames, cartStorage, reduceQuantityGameCart, setCartStorage } = useContext(GlobalContext);

  // necessaria perchè il games in contesto globale potrebbe essere filtrato, ma è sempre necessario fare un confronto tra TUTTI i giochi
  const [games, setGames] = useState([]);

  const gamesUrl = 'http://localhost:3000/games';

  // al montaggio del componente fa un fetch degli ID salvati in localStorage
  useEffect(() => {
    const storedIds = localStorage.getItem("wishListGames");
    if (storedIds) {
      setWishListGames(JSON.parse(storedIds));
    }
  }, []);

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
        <div className="d-flex justify-content-center text-white mb-3">
          <h2>La tua wishList</h2>
        </div>


        <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
          {gamesInWishlist.map(game =>
            <div className="card shadow bg-dark col-lg-3 col-md-4 text-white" key={game.id}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <Link to={`/games/${game.id}`}> <img src={game.imagePath} className="card-img-top pb-3" alt={game.title} /> </Link>
                <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                {game.discount > 0 ? (
                  <>
                    <p className="card-text mb-1 pb-3">
                      <span className="text-decoration-line-through text-danger me-2">{game.price} €</span>
                      <span className="text-success">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                      <span className="card-text mb-2 rounded position-absolute bg-warning discount text-dark fw-bold p-2 ms-3">
                        - {game.discount}%
                      </span>
                    </p>
                  </>
                ) : (<div className='mb-3'>{game.price} €</div>)}
                <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start mt-3">
                  {(() => {
                    const gameInCart = cartStorage.find(g => g.id === game.id);
                    const quantity = gameInCart ? gameInCart.quantity : 0;


                    if (quantity > 0) {
                      return (
                        <div className="d-flex align-items-center">
                          <button
                            onClick={() => reduceQuantityGameCart(game)}
                            type="button"
                            className="btn btn-warning me-2"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>

                          <input
                            type="text"
                            readOnly
                            value={quantity}
                            className="form-control text-center me-2"
                            style={{ width: '60px', backgroundColor: '#fff', color: '#000' }}
                          />

                          <button
                            onClick={() => addGameCart(game)}
                            type="button"
                            className="btn btn-warning me-sm-3"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <button
                          onClick={() => addGameCart(game)}
                          type="button"
                          className="btn btn-warning me-sm-3 mb-2 mb-sm-0"
                        >
                          Aggiungi al carrello
                        </button>
                      );
                    }
                  })()}
                  <WishlistButton gameId={game.id} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

}

export default WishListPage;