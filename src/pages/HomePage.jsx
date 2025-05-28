import axios from "axios";
import { useEffect, useState } from "react"


function HomePage() {



    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/games`)
            .then(res => {
                console.log(res.data);
                setGames(res.data);
            })
            .catch(err => console.log(err));
    }

    useEffect(getGames, []);


    return (
        <div className="container">
            <div className='container shadow herospace mb-4 text-center fs-5 p-4'><h2 className='herospace-heading text-warning'>Hero Space</h2></div>
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
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card" key={game.id}>
                                            <img src={game.image} className="card-img-top" alt={game.title} />
                                            <div className="card-body">
                                                <h5 className="card-title">{game.title}</h5>
                                                <p className="card-text">{game.description}</p>
                                                <a href="#" className="btn btn-primary">Dettaglio prodotto</a>
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
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="d-flex justify-content-center">
                                        <div className="card mb-5" key={game.id}>
                                            <img src={game.image} className="card-img-top" alt={game.title} />
                                            <div className="card-body col-12">
                                                <h5 className="card-title">{game.title}</h5>
                                                <p className="card-text">{game.description}</p>
                                                <a href="#" className="btn btn-primary">Dettaglio prodotto</a>
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



    )
}

export default HomePage