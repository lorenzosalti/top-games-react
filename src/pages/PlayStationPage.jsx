import axios from "axios";
import { useEffect, useState } from "react";


function PlayStation() {
    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/console/playstation`)
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.log(err));

    }


    useEffect(getGames, []);

    return (
        <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
            {games.map(game =>
                <div key={game.id} className="card bg-dark col-lg-3 col-md-4 text-white">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <h3>PlayStation</h3>
                        <p>Prima Prova senza css, tant poj so ver Mastu Valerio</p>
                        <figure className="mt-2">
                            <img src={game.imagePath} className="card-img-top " alt={game.title} />
                        </figure>
                        <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                        <h5 className="card-text">{game.platform}</h5>
                        <p className="card-text fw-bold">{game.description}</p>
                        <p className="card-text">{game.price}€</p>
                        <button type="button" className="btn btn-warning fw-bold">Dettaglio Prodotto</button>
                    </div>
                </div>
            )}
        </div>
    )
}


export default PlayStation