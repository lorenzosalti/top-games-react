import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";


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
            <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
                {games.map(game => <Card data={game} key={game.id} />)}
            </div>

        </section>
    )
}


export default Pc