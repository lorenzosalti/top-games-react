import { Link, NavLink } from 'react-router-dom';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';

function Search() {
    const { searchGames, search, setSearch } = useContext(GlobalContext)

    return (

        <form onSubmit={searchGames} className="row g-1 justify-content-center ">

            <div className="col-md-6 p-4">
                <input type="text" className="form-control bg-warning" id="inputPassword2" placeholder="Cerca tra tutti i giochi..."
                    value={search} onChange={(e) => setSearch(e.target.value)}
                />

            </div>
        </form>
    )
}

export default Search