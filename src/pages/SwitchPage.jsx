import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from "../components/Search";


function Switch() {
    const [games, setGames] = useState([]);

    function getGames() {
        axios.get(`http://127.0.0.1:3000/console/switch`)
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
                    <h2 className=" fs-1"><i className="bi bi-nintendo-switch"></i> Nintendo Switch</h2>
                </div>

                {games.map(game => <Card data={game} key={game.id} />)}
            </div>

        </section>
    );
}


export default Switch;