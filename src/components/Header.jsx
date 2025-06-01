import { Link, NavLink, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useContext, useEffect } from 'react';
import GlobalContext from '../contexts/globalContext';


export default function Header() {

    const { cartStorage } = useContext(GlobalContext);
    const totalPrice = cartStorage.reduce((acc, game) => acc + Number(game.price), 0);
    const navigate = useNavigate();

    const handleCheckout = () => {
        setTimeout(() => {
            navigate('/checkout');
        }, 100);
    };


    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark mb-5 py-3">
                <div className="container-fluid">
                    <Link to={'/'} className='navbar-brand text-white'>Top Games</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto ">
                            <li className="nav-item">
                                <NavLink to={'/console/playstation'} className='nav-link text-white'>Playstation</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/xbox'} className='nav-link text-white'>Xbox</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/pc'} className='nav-link text-white'>PC</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/switch'} className='nav-link text-white'>Switch</NavLink>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="btn btn-primary position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                    Carrello
                                    {cartStorage.length ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {cartStorage.length}
                                        <span className="visually-hidden">Giochi nel carrello</span>
                                    </span> : ''}

                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className='nav-link text-white'>Wishlist</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Giochi nel carrello</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column">
                    {cartStorage.length ? cartStorage.map((game, index) => (
                        <div key={index} className="card mb-3" >
                            <div className="row g-0 align-items-center">
                                <div className="col-md-4">
                                    <img src={game.imagePath} className="img-fluid rounded-start" alt={game.title} />
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{game.title}</h5>
                                        <p className="card-text mb-1"><strong>Genere:<br /></strong> {game.genres_list}</p>
                                        <p className="card-text mb-2"><strong>Console:<br /></strong> {game.platform}</p>
                                        <p className="card-text fw-bold">Prezzo: {game.price} €</p>
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
                                            defaultValue="1"
                                            style={{ width: '60px' }}
                                        />
                                        <button className="btn btn-danger btn-sm">
                                            Elimina
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                        : <div>Nessun Gioco nel carrello</div>}
                </div>
                {cartStorage.length ? <div className='d-flex flex-column align-items-end mb-4 me-4'>
                    <div className='mb-2'>Prezzo totale: {totalPrice.toFixed(2)}€</div>
                    <button className="btn btn-primary" onClick={handleCheckout} data-bs-dismiss="offcanvas">Sgancia i soldi</button>
                </div> : ''}
            </div>
        </header>
    );
}