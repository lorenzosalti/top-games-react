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
                <h2 className="text-center text-white">Game Catalogue</h2>

                <form onSubmit={searchGames} className="row g-1 justify-content-center ">

                    <div className="col-auto p-4">
                        <input type="text" className="form-control bg-warning" id="inputPassword2" placeholder="Search your games"
                            value={search} onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>
                </form>

                <div class="row row-gap-3 column-gap-2 d-flex justify-content-center">
                    {games.map(game =>
                        <div className="card bg-dark col-4 w-25 text-white" key={game.id}>
                            <div className="card-body">
                                <img src={game.imagePath} className="card-img-top " alt={game.title} />
                                <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                                <p className="card-text">{game.description}</p>
                                <p className="card-text fw-bold">{game.price} €</p>
                                <button type="button" class="btn btn-warning fw-bold">Product details</button>
                            </div>
                        </div>
                    )}
                </div>

            </section >

        </>
    )

};





export default SearchPage;