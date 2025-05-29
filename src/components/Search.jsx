import { Link, NavLink } from 'react-router-dom';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';

function Search() {
    const { searchGames, search, setSearch } = useContext(GlobalContext)

    return (
        <form onSubmit={searchGames} className="row g-1">

            <div className="col-auto">
                <input type="text" className="form-control" id="inputPassword2" placeholder="Search games"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-3">Search Games</button>
            </div>
        </form>
    )
}

export default Search