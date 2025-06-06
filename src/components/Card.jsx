import { Link } from "react-router-dom";
import WishListButton from "./WishListButton";
import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


function Card({ data }) {

    const { id, slug, title, imagePath, price, discount, platform } = data;

    const { cartStorage, setCartStorage, reduceQuantityGameCart } = useContext(GlobalContext);

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

    return (

        <div className="card bg-dark col-lg-3 col-md-4 text-white shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <figure className="mt-2">
                    <Link to={`/games/${slug}`}> <img src={imagePath} className="card-img-top pb-3" alt={title} /> </Link>
                </figure>
                <h5 className="card-title fw-bold pt-2 fs-2">{title}</h5>
                <div className='mt-auto d-flex flex-column justify-content-center align-items-center'>
                    <p className="card-text"><i className="bi bi-controller"></i> <strong>Console:</strong> {platform}</p>
                    {discount > 0 ? (
                        <>
                            <p className="card-text mb-1 pb-3">
                                <span className="text-decoration-line-through text-white me-2">{price} €</span>
                                <span className="text-warning fw-bold">{(price - (price * discount / 100)).toFixed(2)} €</span>
                                <span className="card-text mb-2 rounded position-absolute bg-warning discount text-dark fw-bold p-2 ms-3">
                                    - {discount}%
                                </span>

                            </p>
                        </>
                    ) : (<div className='mb-3'>{price} €</div>)}
                    <div className="d-flex flex-column justify-content-center justify-content-md-start mt-3">
                        {(() => {
                            const gameInCart = cartStorage.find(g => g.id === game.id);
                            const quantity = gameInCart ? gameInCart.quantity : 0;

                            if (quantity > 0) {
                                return (

                                    <div className="d-flex align-items-center mb-3 w-100">


                                        <button
                                            onClick={() => reduceQuantityGameCart(game)}
                                            type="button"
                                            className="btn btn-warning me-2 fs-6 p-1 flex-grow-1"
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            type="text"
                                            readOnly
                                            value={quantity}
                                            className="form-control text-center fs-6"
                                            style={{ width: '60px', backgroundColor: '#fff', color: '#000' }}
                                        />
                                        <button
                                            onClick={() => addGameCart(game)}
                                            type="button"
                                            className="btn btn-warning ms-2 fs-6 p-1 flex-grow-1"
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
                                        className="btn btn-warning fs-5 mb-2 w-100"
                                    >
                                        <FontAwesomeIcon icon={faCartShopping} />
                                    </button>
                                );
                            }
                        })()}

                        <WishListButton gameId={game.id} className="w-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Card;