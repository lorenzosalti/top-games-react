import { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';

function SearchPage() {
    const { games } = useContext(GlobalContext)



    return (

        <>
            <section className="container">
                <h2 className="text-center">Best Games</h2>



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