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



    return (

        <div className="container">
            <WelcomePopup />
            <Search />
            <div className="home-container mb-5">
                <h2 className="text-warning text-center mb-4">Hero Space</h2>

                <div className="content-box w-100 carousel-container">
                    <div
                        id="carouselHeroSpace"
                        className="carousel slide carousel-fade"
                        data-bs-ride="carousel"
                        data-bs-interval="5000"
                    >
                        <div className="carousel-inner rounded-4 overflow-hidden shadow">

                            {
                                ['PlayStation 5', 'Xbox Series X', 'PC', 'Nintendo Switch']
                                    .map(platform => {
                                        const game = games.find(g => g.platform === platform);
                                        if (game) return game;
                                        else return null;
                                    })
                                    .filter(game => game !== null)
                                    .map((game, index) => (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={game.id}>
                                            <a href={`/games/${game.slug}`}>
                                                <img
                                                    src={game.imagePath}
                                                    className="d-block w-100 carousel-img card-img-top w-50"
                                                    alt={game.title}
                                                    style={{ height: '250px', objectFit: 'cover', width: '100px' }}
                                                />
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h3 className="text-light fw-bold">{game.title}</h3>
                                                    <p className="text-light">{game.description}</p>
                                                </div>
                                            </a>
                                        </div>
                                    ))
                            }

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
            </div>
            <div className="container mt-5">
                <h2 className="text-center text-white fs-1 mb-4">Ultimi Arrivi:</h2>
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
                                        <div className="row w-50 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className="col-12 col-md-4 mb-4" key={game.id}>
                                                    <div className="card col-12 h-100 text-white p-3 bg-dark">
                                                        <img src={game.imagePath} className="card-img-top" alt={game.title} />
                                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                            <h5 className="card-title text-center mb-3">{game.title}</h5>
                                                            <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold mt-auto">Dettaglio Prodotto</Link> {/* mt-auto per posizionare il bottone in basso */}
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
                <h2 className="text-center text-white fs-1 mb-4">Prodotti in Promozione:</h2>
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
                                        <div className="row w-50 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className="col-12 col-md-4 mb-4 d-flex" key={game.id}>
                                                    <div className="card h-100 bg-dark text-white p-3">
                                                        <img src={game.imagePath} className="card-img-top w-50 mx-auto pt-3" alt={game.title} />
                                                        <div className="card-body d-flex flex-column justify-content-between align-items-center">
                                                            <h5 className="card-title text-center mb-3">{game.title}</h5>
                                                            <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold mt-auto mb-3">Dettaglio Prodotto</Link>
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
        </div>



    );
}

export default HomePage;