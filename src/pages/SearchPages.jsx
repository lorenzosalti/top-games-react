import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchPage() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const gamesUrl = 'http://localhost:3000/games'

    function getGames() {
        axios.get(gamesUrl, { params: { search } })
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.error(err))
    }

    useEffect(getGames, []);





    function searchGames(event) {
        event.preventDefault();
        getGames();

    }

    console.log(search)





    return <div>
        <section className="container">
            <h2 className="text-center">Best Games</h2>

            <form onSubmit={searchGames} className="row g-1">

                <div className="col-auto">
                    <input type="text" className="form-control" id="inputPassword2" placeholder="Search games"
                        value={search} onChange={(e) => setSearch(e.target.value)}
                    />

                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Search games</button>
                </div>
            </form>
        </section>

    </div>


};





export default SearchPage;