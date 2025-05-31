import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
                        <figure className="mt-2">
                            <img src={game.imagePath} className="card-img-top " alt={game.title} />
                        </figure>
                        <h3 className="card-title fw-bold pt-2">{game.title}</h3>
                        <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                        <p className="card-text"><strong>Prezzo</strong> {game.price} €</p>
                        <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold">Dettaglio Prodotto</Link>
                    </div>
                </div>
            )}
        </div>
    )
}


export default PlayStation