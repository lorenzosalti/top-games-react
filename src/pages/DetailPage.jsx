import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import GlobalContext from '../contexts/globalContext';
import WishListButton from '../components/WishListButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";


function DetailPage() {

    const { cartStorage, setCartStorage, reduceQuantityGameCart } = useContext(GlobalContext);

    const { id } = useParams();

    const [game, setGame] = useState({});

    const gamesUrl = 'http://localhost:3000/games';

    function getData() {

        axios.get(`${gamesUrl}/${id}`)
            .then(res => {
                // console.log(res.data);
                setGame(res.data);
            })
            .catch(err => console.error(err));
    }
    function addGameCart() {

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


    useEffect(
        getData,
        [id]);

    // discount

    function hasDiscount(discount_start, discount_finish) {
        const now = new Date();
        if (discount_start && discount_finish) {
            const start = new Date(discount_start);
            const end = new Date(discount_finish);
            return now >= start && now <= end;
        }
        return false;
    }

    let arrayCart = sessionStorage.getItem('cart');


    return (

        <div className="container w-100 w-md-75 w-lg-50 mt-5">
            <div className="card shadow mb-5 text-white card-detail-bg">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start detail-container">
                    <figure className="m-3 me-md-4">
                        <img src={game.imagePath} className="img-fluid rounded card-img-top" alt={game.title} style={{ maxWidth: '250px' }} />
                    </figure>
                    <div className="d-flex flex-column p-3 text-center text-md-start text-detail-container">
                        <h5 className="card-title fw-bold pt-2 fs-3 fs-md-1">{game.title}</h5>
                        <p className="card-text">{game.description}</p>
                        <p className="card-text"><strong>Genere:</strong> {game.genres_list}</p>
                        <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                        <div>
                            {game.discount > 0 ? (
                                <>
                                    <p className="card-text mb-1 pb-3">
                                        <span className="text-decoration-line-through text-white me-2">{game.price} €</span>
                                        <span className="text-warning fw-bold">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                                        <span className="card-text mb-2 rounded position-absolute bg-warning text-dark fw-bold p-1 ms-3">
                                            - {game.discount}%
                                        </span>
                                    </p>
                                </>
                            ) : (<div>{game.price} €</div>)}

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
                                <WishListButton gameId={game.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;