import axios from "axios";
import { useEffect, useState } from "react";
import Search from '../components/Search';
import { Link } from "react-router-dom";
import WelcomePopup from "../components/WelcomePopup";


function HomePage() {

    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/games`)
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.log(err));

    }


    useEffect(getGames, []);

    function hasDiscount(discount_start, discount_finish) {
        const now = new Date();
        if (discount_start && discount_finish) {
            const start = new Date(discount_start);
            const end = new Date(discount_finish);
            return now >= start && now <= end;
        }
        return false;
    }

    const discountedGames = games.filter(game =>
        hasDiscount(game.discount_start, game.discount_finish)
    );


    return (

        <div className="container">
            <WelcomePopup />
            <Search />
            <div className="home-container mt-3 mb-5 d-flex justify-content-center">

                <div className="content-box rounded-4 w-75 bg-dark carousel-container carousel shadow">
                    <div
                        id="carouselHeroSpace"
                        className="carousel slide carousel-fade"
                        data-bs-ride="carousel"
                        data-bs-interval="5000"
                    >
                        <div className="carousel-inner rounded-4 overflow-hidden shadow h-50">
                            <div className="carousel-item active h-50">
                                <img src="src/assets/spedizione-gratuita.jpg" className="d-block w-100 h-100" alt="spedizione-gratuita" />
                                <div className="carousel-overlay"></div>
                            </div>

                            <div className="carousel-item h-50">
                                <figure>
                                    <Link to={'http://localhost:5173/games/1'}>
                                        <img src="src/assets/cyberpunk2077-carosello.png" className="d-block w-100 h-100" alt="cyberpunk" />
                                    </Link>
                                </figure>
                            </div>

                            <div className="carousel-item h-50">
                                <figure>
                                    <Link to={'http://localhost:5173/games/4'}>
                                        <img src="src/assets/forzah-carosello.png" className="d-block w-100 h-100" alt="forza-horizon-5" />
                                    </Link>
                                </figure>
                            </div>

                            <div className="carousel-item h-50">
                                <figure>
                                    <Link to={'http://localhost:5173/games/5'}>
                                        <img src="src/assets/ghost-carosello5.png" className="d-block w-100 h-100" alt="ghost-of-tsushima" />
                                    </Link>
                                </figure>
                            </div>

                            <div className="carousel-item h-50">
                                <figure>
                                    <Link to={'http://localhost:5173/games/9'}>
                                        <img src="src/assets/supermario-carosello.png" className="d-block w-100 h-100" alt="super-mario-odyssey" />
                                    </Link>
                                </figure>
                            </div>
                        </div>

                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselHeroSpace" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselHeroSpace" data-bs-slide="next">
                            <span className="carousel-control-next-icon bg-dark rounded-circle p-2" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div >
            <div className="container mt-5">
                <h2 className="text-center text-white fs-1 mb-5">Ultimi Arrivi:</h2>
                <div id="carouselExampleSingleCard" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        {games && games
                            .filter(game => {
                                const date = new Date('2023-01-01');
                                const createDate = new Date(game.created_at);
                                return createDate > date;
                            })
                            .reduce((acc, game, index, array) => {
                                if (index % 3 === 0) {
                                    acc.push(array.slice(index, index + 3));
                                }
                                return acc;
                            }, [])
                            .map((gameGroup, groupIndex) => (
                                <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                                    <div className="d-flex justify-content-center">
                                        <div className="row w-75 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className="col-md-4 mb-4" key={game.id}>
                                                    <div className="card shadow col-12 h-100 text-white p-3 bg-dark position-relative">
                                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                            <img src={game.imagePath} className="card-img-top pb-3" alt={game.title} />
                                                            <h5 className="card-title text-center mb-3">{game.title}</h5>
                                                            <div className="mt-auto d-flex flex-column justify-content-center align-items-center">
                                                                <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                                                                {game.discount > 0 ?
                                                                    <p className="card-tex m-2">
                                                                        <span className="mt-auto text-decoration-line-through text-white me-2">{game.price} €</span>
                                                                        <span className="text-warning fs-bold">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                                                                        <span className="card-text mb-2 rounded position-absolute discount bg-warning text-dark fw-bold p-2"> - {game.discount}%</span>
                                                                    </p>
                                                                    : <span className="m-2">{game.price} €</span>}
                                                                <Link to={`/games/${game.id}`} className="btn btn-warning">Dettaglio Prodotto</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSingleCard" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                        <span className="visually-hidden">Precedente</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSingleCard" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                        <span className="visually-hidden">Successivo</span>
                    </button>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="text-center text-white fs-1 mb-5">Prodotti in Promozione:</h2>
                <div id="carouselExampleSingleCard2" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {games && games
                            .filter(game => game.discount > 0)
                            .reduce((acc, game, index, array) => {
                                if (index % 3 === 0) {
                                    acc.push(array.slice(index, index + 3));
                                }
                                return acc;
                            }, [])
                            .map((gameGroup, groupIndex) => (
                                <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                                    <div className="d-flex justify-content-center">
                                        <div className="row w-75 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className="col-md-4 mb-4" key={game.id}>
                                                    <div className="card shadow col-12 h-100 text-white p-3 bg-dark position-relative">
                                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                            <img src={game.imagePath} className="card-img-top pb-3" alt={game.title} />
                                                            <h5 className="card-title text-center mb-3">{game.title}</h5>
                                                            <div className="mt-auto d-flex flex-column justify-content-center align-items-center">
                                                                <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                                                                <p className="card-text mb-1 pb-3">
                                                                    <span className="text-decoration-line-through text-white me-2">{game.price} €</span>
                                                                    <span className="text-warning fw-bold">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                                                                </p>
                                                                <span className="card-text mb-2 rounded position-absolute discount bg-warning text-dark fw-bold p-2">
                                                                    - {game.discount}%
                                                                </span>
                                                                <Link to={`/games/${game.id}`} className="btn btn-warning">Dettaglio Prodotto</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleSingleCard2" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                        <span className="visually-hidden">Precedente</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleSingleCard2" data-bs-slide="next">
                        <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                        <span className="visually-hidden">Successivo</span>
                    </button>
                </div>
            </div>
        </div >



    );
}

export default HomePage;