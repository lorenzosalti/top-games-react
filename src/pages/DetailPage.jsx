import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import GlobalContext from '../contexts/globalContext';

function DetailPage() {

    const { cartStorage, setCartStorage } = useContext(GlobalContext);

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
        const updateCart = [...cartStorage, game];
        setCartStorage(updateCart);

        let string = JSON.stringify(updateCart);
        localStorage.setItem('cart', string);
        let arrayCart = localStorage.getItem('cart');
        console.log(JSON.parse(arrayCart));
    }


    useEffect(
        getData,
        [id]);

    return (

        <div className="container w-100 w-md-75 w-lg-50">
            <div className="card mb-5 text-white card-detail-bg">
                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start">

                    <figure className="m-3 me-md-4">
                        <img src={game.imagePath} className="img-fluid rounded" alt={game.title} style={{ maxWidth: '250px' }} />
                    </figure>

                    <div className="d-flex flex-column p-3 text-center text-md-start">
                        <h5 className="card-title fw-bold pt-2 fs-3 fs-md-1">{game.title}</h5>
                        <p className="card-text ">{game.description}</p>
                        <p className="card-text"><strong>Genere:</strong> {game.genres_list}</p>
                        <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                        <p className="card-text fw-bold">Prezzo: {game.price} €</p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start mt-3">
                            <button type="button" className="btn btn-warning me-sm-3 mb-2 mb-sm-0">Aggiungi al carrello</button>
                            <button type="button" className="btn btn-warning">Aggiungi alla wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;