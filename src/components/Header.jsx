import { Link, NavLink } from 'react-router-dom';
import Search from './Search';


export default function Header() {

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
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
                    </div>
                    <NavLink>Carrello</NavLink>
                </div>
            </nav>
        </header>
    );
}