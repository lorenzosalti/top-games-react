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
        <header>
            <nav className="navbar fixed-top navbar-expand-lg bg-dark navbar-dark mb-5 py-3 shadow">
                <div className="container-fluid me-5 ms-5">
                    <Link to={'/'} className='navbar-brand text-white'>
                        <img src="/tg-logo2.png" className="d-block w-100 h-100" alt="logo-tg" />

                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto ">
                            <li className="nav-item">
                                <NavLink to={'/console/playstation'} className='nav-link text-white zoom-effect fs-5'> <FontAwesomeIcon icon={faPlaystation} /> PlayStation 5</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/xbox'} className='nav-link text-white zoom-effect fs-5'> <FontAwesomeIcon icon={faXbox} /> Xbox Series X</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/pc'} className='nav-link text-white zoom-effect fs-5'> <FontAwesomeIcon icon={faDesktop} /> PC</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/switch'} className='nav-link text-white zoom-effect fs-5'> <i className="bi bi-nintendo-switch"></i> Nintendo Switch</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item m-2">
                                <NavLink className=" position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    <span className='text-white fs-3'><FontAwesomeIcon icon={faCartShopping} /></span>
                                    {cartStorage.length ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {totalGameCart}
                                        <span className="visually-hidden">Giochi nel carrello</span>
                                    </span> : ''}

                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <span className=''><NavLink to={'/wishlist'} className='nav-link zoom-effect text-white fs-3'><FontAwesomeIcon icon={faHeart} /></NavLink></span>
                            </li>
                        </ul>
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
                        <div key={index} className="card mb-3 bg-dark" >
                            <div className="row g-0 align-items-center bg-dark">
                                <div className="col-md-4">
                                    <img src={game.imagePath} className="img-fluid rounded-start" alt={game.title} />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body text-white">
                                        <h5 className="card-title">{game.title}</h5>
                                        <p className="card-text mb-1"><strong>Genere:<br /></strong> {game.genres_list}</p>
                                        <p className="card-text mb-2"><strong>Console:<br /></strong> {game.platform}</p>
                                        <p className="card-text fw-bold">Prezzo: {game.discount ? (game.price - (game.price * game.discount / 100)).toFixed(2) : Number(game.price).toFixed(2)} €</p>
                                    </div>
                                </div>
                                <div className="col-md-2 text-end pe-4">
                                    <div className="d-flex flex-column align-items-center">
                                        <label htmlFor={`quantityInput${index}`} className="form-label">Quantità</label>
                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            id={`quantityInput${index}`}
                                            min="1"
                                            value={game.quantity || 1}
                                            onChange={(e) => updateQuantity(game, e.target.value)}
                                            style={{ width: '60px' }}
                                        />
                                        <button className="btn btn-warning text-black btn-sm" onClick={() => deleteGameCart(game)}>
                                            Elimina
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                        : <div className="text-white">Nessun gioco nel carrello</div>}
                </div>
                {cartStorage ? <div className='d-flex flex-column align-items-center mb-4 me-4 mt-4'>
                    <div className='mb-2 text-white fw-bold'>Prezzo totale: {grossPrice.toFixed(2)} €</div>
                    <button className="btn btn-warning text-black" onClick={handleCheckout} data-bs-dismiss="offcanvas">Procedi al Pagamento</button>
                </div> : ''}
            </div>
        </header>
    );
}