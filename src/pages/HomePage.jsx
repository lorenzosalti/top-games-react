import axios from "axios";
import { useEffect, useState } from "react";
import Search from '../components/Search';
import { Link } from "react-router-dom";

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
            <Search />
            <div className='container-fluid shadow herospace mb-4 text-center fs-5 p-4'><h2 className='herospace-heading text-warning'>Hero Space</h2></div>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Carosello ultimi arrivi</h2>
                <div id="carouselExampleSingleCard" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {games && games.filter(game => {
                            const date = new Date('2023-01-01');
                            const createDate = new Date(game.created_at);
                            return createDate > date;
                        })
                            .map((game, index) =>
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={game.id}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card col-3">
                                            <img src={game.imagePath} className="card-img-top" alt={game.title} />
                                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                <h5 className="card-title">{game.title}</h5>
                                                <p className="card-text">{game.description}</p>
                                                <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold">Dettaglio Prodotto</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>)}

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
                <h2 className="text-center mb-4">Carosello prodotti scontati</h2>
                <div id="carouselExampleSingleCard2" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">

                        {games && games.filter(game => {
                            const discount = 0;
                            const discountGames = game.discount;
                            return discountGames > discount;
                        })
                            .map((game, index) =>
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={game.id}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card col-3 mb-5">
                                            <img src={game.imagePath} className="card-img-top w-50" alt={game.title} />
                                            <div className="card-body col-12">
                                                <h5 className="card-title">{game.title}</h5>
                                                <p className="card-text">{game.description}</p>
                                                <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold">Dettaglio Prodotto</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>)}

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