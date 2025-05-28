import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchPage() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState('');
    const gamesUrl = 'http://localhost:3000/games'

    function getGames() {
        axios.get(gamesUrl, { params: { search } })
            .then(res => {
                setGames(res.data)

            })
            .catch(err => console.error(err))
    }

    useEffect(getGames, []);

    console.log(games)

    function searchGames(event) {
        event.preventDefault();
        getGames();

    }


    return (

        <>
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

                {games.map(game =>
                    <div className="card" key={game.id}>
                        <div className="card-body">
                            <img src={game.imagePath} className="card-img-top w-50" alt={game.title} />
                            <h5 className="card-title">{game.title}</h5>
                            <p className="card-text">{game.description}.</p>
                            <p className="card-text">{game.price}.</p>
                        </div>
                    </div>
                )}
            </section>

        </>
    )

};





export default SearchPage;