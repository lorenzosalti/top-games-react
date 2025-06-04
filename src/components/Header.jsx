import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useContext, useEffect } from 'react';
import GlobalContext from '../contexts/globalContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaystation } from '@fortawesome/free-brands-svg-icons';
import { faXbox } from '@fortawesome/free-brands-svg-icons';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';



export default function Header() {

    const { cartStorage, removeFromCart, updateQuantity, grossPrice } = useContext(GlobalContext);
    const navigate = useNavigate();
    const totalGameCart = cartStorage.reduce((acc, game) => {
        return acc + game.quantity;
    }, 0);

    const handleCheckout = () => {
        setTimeout(() => {
            navigate('/checkout');
        }, 100);
    };

    function deleteGameCart(game) {
        removeFromCart(game);
    }

    return (
        <header >
            <nav className="navbar fixed-top  navbar-expand-lg navbar-dark bg-dark py-3 px-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="/tg-logo2.png" className="d-block w-100 h-100" alt="logo-tg" /></Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex d-lg-none justify-content-center my-3">
                        <NavLink
                            className="position-relative text-white fs-3 mx-3"
                            to="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                            {cartStorage.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-black fs-6">
                                    {totalGameCart}
                                    <span className="visually-hidden">Giochi nel carrello</span>
                                </span>
                            )}
                        </NavLink>

                        <NavLink to="/wishlist" className="nav-link text-white fs-3 mx-3">
                            <FontAwesomeIcon icon={faHeart} />
                        </NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to="/console/playstation" className="nav-link text-white zoom-effect fs-2 pe-3">
                                    <FontAwesomeIcon icon={faPlaystation} /> PlayStation 5
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/console/xbox" className="nav-link text-white zoom-effect fs-2 pe-3">
                                    <FontAwesomeIcon icon={faXbox} /> Xbox Series X
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/console/pc" className="nav-link text-white zoom-effect fs-2 pe-3">
                                    <FontAwesomeIcon icon={faDesktop} /> PC
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/console/switch" className="nav-link text-white zoom-effect fs-2 pe-3">
                                    <i className="bi bi-nintendo-switch"></i> Nintendo Switch
                                </NavLink>
                            </li>
                        </ul>

                    </div>
                    <div className="d-none d-lg-flex align-items-center">
                        <NavLink
                            className="position-relative text-white fs-4 mx-3"
                            to="#"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                        >
                            <FontAwesomeIcon icon={faCartShopping} />
                            {cartStorage.length > 0 && (
                                <span className="position-absolute top-0 fs-6 start-100 translate-middle badge rounded-pill bg-warning text-black">
                                    {totalGameCart}
                                    <span className="visually-hidden">Giochi nel carrello</span>
                                </span>
                            )}
                        </NavLink>

                        <NavLink to="/wishlist" className="nav-link text-white fs-4 mx-3">
                            <FontAwesomeIcon icon={faHeart} />
                        </NavLink>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-end bg-dark" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="offcanvasRightLabel">Giochi nel carrello</h5>
                    <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    {cartStorage.length ? cartStorage.map((game, index) => (
                        <div key={index} className="card mb-3 bg-dark text-white">
                            <div className="row g-0 cart-item-row p-2">
                                <div className="col-4 col-sm-3">
                                    <img
                                        src={game.imagePath}
                                        className="img-fluid rounded-start cart-image"
                                        alt={game.title}
                                    />
                                </div>
                                <div className="col-8 col-sm-6">
                                    <div className="card-body py-0">
                                        <h2 className="card-title fs-2">{game.title}</h2>
                                        <p className="card-text mb-1"><strong>Genere:</strong> {game.genres_list}</p>
                                        <p className="card-text mb-1"><strong>Console:</strong> {game.platform}</p>
                                        <p className="card-text fw-bold mb-0">Prezzo: {game.discount ? (game.price - (game.price * game.discount / 100)).toFixed(2) : Number(game.price).toFixed(2)} €</p>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <label htmlFor={`quantityInput${index}`} className="form-label mb-1 text-center">Quantità</label>
                                    <div className="cart-actions">
                                        <input
                                            type="number"
                                            className="form-control text-center"
                                            id={`quantityInput${index}`}
                                            min="1"
                                            value={game.quantity || 1}
                                            onChange={(e) => updateQuantity(game, e.target.value)}
                                            style={{ width: '70px' }}
                                        />
                                        <button
                                            className="btn btn-warning text-black btn-sm  fs-6"
                                            onClick={() => deleteGameCart(game)}
                                        >
                                            Elimina
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )) : <div className="text-white">Nessun gioco nel carrello</div>}
                </div>
                {cartStorage ? <div className='d-flex flex-column align-items-center mb-4 me-4 mt-4'>
                    <div className='mb-2 text-white fw-bold'>Prezzo totale: {grossPrice.toFixed(2)} €</div>
                    <button className="btn btn-warning text-black fs-5" onClick={handleCheckout} data-bs-dismiss="offcanvas">Procedi al Pagamento</button>
                </div> : ''}
            </div>
        </header>
    );
}