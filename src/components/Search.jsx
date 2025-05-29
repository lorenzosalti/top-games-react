import { Link, NavLink } from 'react-router-dom';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';

function Search() {
    const { searchGames, search, setSearch } = useContext(GlobalContext)

    return (

        <form onSubmit={searchGames} className="row g-1 justify-content-center ">

            <div className="col-auto p-4">
                <input type="text" className="form-control bg-warning" id="inputPassword2" placeholder="Search your games"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                />

            </div>
        </form>
    )
}

export default Search