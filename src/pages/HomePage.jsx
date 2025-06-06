import axios from "axios";
import { useEffect, useState } from "react";
import Search from '../components/Search';
import { Link } from "react-router-dom";
import WelcomePopup from "../components/WelcomePopup";
import GlobalContext from "../contexts/globalContext";
import { useContext } from "react";
import WishListButton from "../components/WishListButton";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


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

    const [gamesPerSlide, setGamesPerSlide] = useState(3);

    useEffect(() => {
        const updateGamesPerSlide = () => {
            let perSlide = 3;

            if (window.innerWidth < 768) {
                perSlide = 1;
            } else if (window.innerWidth < 992) {
                perSlide = 2;
            } else {
                perSlide = 3;
            }

            setGamesPerSlide(perSlide);
        };

        updateGamesPerSlide();
        window.addEventListener('resize', updateGamesPerSlide);
        return () => window.removeEventListener('resize', updateGamesPerSlide);
    }, []);

    function groupGames(gamesArray, perSlide) {
        return gamesArray.reduce((acc, game, index) => {
            if (index % perSlide === 0) {
                acc.push(gamesArray.slice(index, index + perSlide));
            }
            return acc;
        }, []);
    }



    const { cartStorage, setCartStorage, reduceQuantityGameCart } = useContext(GlobalContext);

    function addGameCart(game) {
        const existingGameIndex = cartStorage.findIndex(g => g.id === game.id);

        let updatedCart;

        if (existingGameIndex !== -1) {
            updatedCart = [...cartStorage];
            updatedCart[existingGameIndex].quantity += 1;

        } else {
            updatedCart = [...cartStorage, { ...game, quantity: 1 }];
        }

        setCartStorage(updatedCart);
    }


    return (

        <div className="container mb-4">
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

                            {/* Immagini statiche con link dinamico */}
                            <div className="carousel-item h-50">
                                <Link to={`/games/cyberpunk-2077`}>
                                    <img src="src/assets/cyberpunk2077-carosello.png" className="d-block w-100 h-100" alt="cyberpunk" />
                                </Link>
                            </div>

                            <div className="carousel-item h-50">
                                <Link to={`/games/forza-horizon-5`}>
                                    <img src="src/assets/forzah-carosello.png" className="d-block w-100 h-100" alt="forza-horizon-5" />
                                </Link>
                            </div>

                            <div className="carousel-item h-50">
                                <Link to={`/games/ghost-of-tsushima`}>
                                    <img src="src/assets/ghost-carosello.png" className="d-block w-100 h-100" alt="ghost-of-tsushima" />
                                </Link>
                            </div>

                            <div className="carousel-item h-50">
                                <Link to={`/games/super-mario-odyssey`}>
                                    <img src="src/assets/supermario-carosello.png" className="d-block w-100 h-100" alt="super-mario-odyssey" />
                                </Link>
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
                        {groupGames(games.filter(game => new Date(game.created_at) > new Date('2023-01-01')), gamesPerSlide)
                            .map((gameGroup, groupIndex) => (
                                <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                                    <div className="d-flex justify-content-center">
                                        <div className="row w-75 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className={`col-12 col-sm-${12 / gamesPerSlide} mb-4`} key={game.id}>
                                                    <div className="card shadow col-12 h-100 text-white p-3 bg-dark position-relative">
                                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                            <Link to={`/games/${game.slug}`}> <img src={game.imagePath} className="card-img-top pb-3" alt={game.title} /> </Link>
                                                            <h5 className="card-title text-center mb-3 fs-2">{game.title}</h5>
                                                            <div className="mt-auto d-flex flex-column justify-content-center align-items-center">
                                                                <p className="card-text"><i className="bi bi-controller"></i> <strong>Console:</strong> {game.platform}</p>
                                                                {game.discount > 0 ?
                                                                    <p className="card-tex m-2">
                                                                        <span className="mt-auto text-decoration-line-through text-white me-2">{game.price} €</span>
                                                                        <span className="text-warning fs-bold">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                                                                        <span className="card-text mb-2 rounded position-absolute discount bg-warning text-dark fw-bold p-2"> - {game.discount}%</span>
                                                                    </p>
                                                                    : <span className="m-2">{game.price} €</span>}
                                                            </div>
                                                            <div className="d-flex flex-column justify-content-center justify-content-md-start mt-3">
                                                                {(() => {
                                                                    const gameInCart = cartStorage.find(g => g.id === game.id);
                                                                    const quantity = gameInCart ? gameInCart.quantity : 0;

                                                                    if (quantity > 0) {
                                                                        return (
                                                                            <div className="d-flex align-items-center mb-3 w-100">
                                                                                <button
                                                                                    onClick={() => reduceQuantityGameCart(game)}
                                                                                    type="button"
                                                                                    className="btn btn-warning me-2 fs-4 p-2 flex-grow-1"
                                                                                >
                                                                                    <FontAwesomeIcon icon={faMinus} />
                                                                                </button>
                                                                                <input
                                                                                    type="text"
                                                                                    readOnly
                                                                                    value={quantity}
                                                                                    className="form-control text-center fs-4"
                                                                                    style={{ width: '80px', backgroundColor: '#fff', color: '#000' }}
                                                                                />
                                                                                <button
                                                                                    onClick={() => addGameCart(game)}
                                                                                    type="button"
                                                                                    className="btn btn-warning ms-2 fs-4 p-2 flex-grow-1"
                                                                                >
                                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <button
                                                                                onClick={() => addGameCart(game)}
                                                                                type="button"
                                                                                className="btn btn-warning fs-3 mb-3 w-100 pe-5 ps-5"
                                                                            >
                                                                                <FontAwesomeIcon icon={faCartShopping} />
                                                                            </button>
                                                                        );
                                                                    }
                                                                })()}
                                                                <WishListButton gameId={game.id} className="w-100" />
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
                        {groupGames(
                            games.filter(game => game.discount > 0),
                            gamesPerSlide
                        )
                            .map((gameGroup, groupIndex) => (
                                <div className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`} key={groupIndex}>
                                    <div className="d-flex justify-content-center">
                                        <div className="row w-75 justify-content-center">
                                            {gameGroup.map((game, gameIndex) => (
                                                <div className={`col-12 col-sm-${12 / gamesPerSlide} mb-4`} key={game.id}>
                                                    <div className="card shadow h-100 col-12 text-white p-3 bg-dark position-relative">
                                                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                            <Link to={`/games/${game.slug}`}> <img src={game.imagePath} className="card-img-top pb-3" alt={game.title} /> </Link>
                                                            <h5 className="card-title text-center mb-3 fs-2">{game.title}</h5>
                                                            <div className="mt-auto d-flex flex-column justify-content-center align-items-center">
                                                                <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                                                                <p className="card-text mb-1 pb-3">
                                                                    <span className="text-decoration-line-through text-white me-2">{game.price} €</span>
                                                                    <span className="text-warning fw-bold">{(game.price - (game.price * game.discount / 100)).toFixed(2)} €</span>
                                                                </p>
                                                                <span className="card-text mb-2 rounded position-absolute discount bg-warning text-dark fw-bold p-2">
                                                                    - {game.discount}%
                                                                </span>
                                                                <div className="d-flex flex-column justify-content-center justify-content-md-start mt-3">
                                                                    {(() => {
                                                                        const gameInCart = cartStorage.find(g => g.id === game.id);
                                                                        const quantity = gameInCart ? gameInCart.quantity : 0;

                                                                        if (quantity > 0) {
                                                                            return (

                                                                                <div className="d-flex align-items-center mb-3">
                                                                                    <button
                                                                                        onClick={() => reduceQuantityGameCart(game)}
                                                                                        type="button"
                                                                                        className="btn btn-warning me-2 fs-4 p-2"
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faMinus} />
                                                                                    </button>
                                                                                    <input
                                                                                        type="text"
                                                                                        readOnly
                                                                                        value={quantity}
                                                                                        className="form-control text-center fs-4"
                                                                                        style={{ width: '80px', backgroundColor: '#fff', color: '#000' }}
                                                                                    />
                                                                                    <button
                                                                                        onClick={() => addGameCart(game)}
                                                                                        type="button"
                                                                                        className="btn btn-warning ms-2 fs-4 p-2"
                                                                                    >
                                                                                        <FontAwesomeIcon icon={faPlus} />
                                                                                    </button>
                                                                                </div>
                                                                            );
                                                                        } else {
                                                                            return (

                                                                                <button
                                                                                    onClick={() => addGameCart(game)}
                                                                                    type="button"
                                                                                    className="btn btn-warning fs-3 mb-3"
                                                                                >
                                                                                    <FontAwesomeIcon icon={faCartShopping} />
                                                                                </button>
                                                                            );
                                                                        }
                                                                    })()}
                                                                    <WishListButton gameId={game.id} />
                                                                </div>
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