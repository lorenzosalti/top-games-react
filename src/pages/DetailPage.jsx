import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function DetailPage() {

    const { id } = useParams();

    const [game, setGame] = useState({});

    const gamesUrl = 'http://localhost:3000/games';

    function getData() {

        axios.get(`${gamesUrl}/${id}`)
            .then(res => {
                console.log(res.data)
                setGame(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(
        getData,
        [id]);

    return (

        <div className="container">
            <div className="card bg-dark col-lg-3 col-md-4 mb-5 text-white w-100">
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <figure className="mt-2 w-25"><img src={game.imagePath} className="card-img-top " alt={game.title} /></figure>
                    <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                    <p className="card-text">{game.description}</p>
                    <p className="card-text"><strong>Genere:</strong> {game.genres_list}</p>
                    <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                    <p className="card-text fw-bold">{game.price} €</p>
                    <button type="button" className="btn btn-warning">Aggiungi al carrello</button>

                </div>
            </div>
        </div>
    )
}

export default DetailPage;