import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Switch() {
    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/console/switch`)
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.log(err));

    }


    useEffect(getGames, []);

    return (
        <section className="container">

            <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">

                {games.map(game =>
                    <div key={game.id} className="card bg-dark col-lg-3 col-md-4 text-white">
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                            <figure className="mt-2">
                                <img src={game.imagePath} className="card-img-top " alt={game.title} />
                            </figure>
                            <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                            <div className='mt-auto d-flex flex-column justify-content-center align-items-center'>
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
                                <Link to={`/games/${game.id}`} className="btn btn-warning">Dettaglio Prodotto</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}


export default Switch