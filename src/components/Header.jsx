import { Link, NavLink } from 'react-router-dom';
import Search from './Search';


export default function Header() {
    // localStorage.setItem('cart', []);
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
                                    {localStorage.length ? <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {localStorage.length}
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
                <div className="offcanvas-body">
                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Nome del gioco</h5>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}