import { Link } from "react-router-dom";
import WishListButton from "./WishListButton";
import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { useState, useEffect } from "react";
import axios from "axios";

function Card({ data }) {

    const { id, title, imagePath, price, discount, platform } = data;

    const { cartStorage, setCartStorage } = useContext(GlobalContext);

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
        // let arrayCart = localStorage.getItem('cart');
        // console.log(JSON.parse(arrayCart));
        const existingGameIndex = cartStorage.findIndex(g => g.id === game.id);

        let updatedCart;

        if (existingGameIndex !== -1) {
            updatedCart = [...cartStorage];
            updatedCart[existingGameIndex].quantity += 1;

        } else {
            updatedCart = [...cartStorage, { ...game, quantity: 1 }];
        }

        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    useEffect(
        getData,
        [id]);

    return (

        <div className="card bg-dark col-lg-3 col-md-4 text-white shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <figure className="mt-2">
                    <Link to={`/games/${id}`}> <img src={imagePath} className="card-img-top pb-3" alt={title} /> </Link>
                </figure>
                <h5 className="card-title fw-bold pt-2">{title}</h5>
                <div className='mt-auto d-flex flex-column justify-content-center align-items-center'>
                    <p className="card-text"><strong>Console:</strong> {platform}</p>
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
                    <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start mt-3">
                        <button onClick={addGameCart} type="button" className="btn btn-warning me-sm-3 mb-2 mb-sm-0">Aggiungi al carrello</button>
                        <WishListButton gameId={id} />
                    </div>


                </div>
            </div>
        </div>
    )
}


export default Card;