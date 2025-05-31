import { Link, NavLink } from 'react-router-dom';
import Search from './Search';
import { useContext, useEffect } from 'react';
import GlobalContext from '../contexts/globalContext';


export default function Header() {

    const { cartStorage } = useContext(GlobalContext);
    const totalPrice = cartStorage.reduce((acc, game) => acc + Number(game.price), 0)
    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5 py-3">
                <div className="container-fluid">
                    <Link to={'/'} className='navbar-brand'>Top Games</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <NavLink to={'/console/playstation'} className='nav-link'>Playstation</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/xbox'} className='nav-link'>Xbox</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/pc'} className='nav-link'>PC</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/console/switch'} className='nav-link'>Switch</NavLink>
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
                                <NavLink className='nav-link'>Wishlist</NavLink>
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
                <div className="offcanvas-body d-flex flex-column justify-content-between ">
                    {cartStorage.length ? cartStorage.map((game, index) => (
                        <div key={index} className="card mb-3" >
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={game.imagePath} className="img-fluid rounded-start" alt={game.title} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{game.title}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                        : <div>Nessun Gioco nel carrello</div>}
                    {cartStorage.length ? <div className='align-self-end d-flex flex-column align-items-center'>
                        <div className='mb-2'>Prezzo totale: {totalPrice.toFixed(2)}€</div>
                        <Link to={'/order'} className="btn btn-primary" role="button">Sgancia i soldi</Link>
                    </div> : ''}

                </div>
            </div>
        </header>
    );
}