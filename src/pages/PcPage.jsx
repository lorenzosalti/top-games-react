import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import Search from "../components/Search";


function Pc() {
    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/console/pc`)
            .then(res => {
                setGames(res.data);
            })
            .catch(err => console.log(err));

    }


    useEffect(getGames, []);

    return (
        <section className="container">
            <Search />
            <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
                <div className="d-flex justify-content-center text-white mb-3 mt-3">
                    <h2><FontAwesomeIcon icon={faDesktop} /> PC</h2>
                </div>
                {games.map(game => <Card data={game} key={game.id} />)}
            </div>

        </section>
    )
}


export default Pc