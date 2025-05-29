import { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';

function SearchPage() {
    const { games, setOrderBy, setOrderByDirection } = useContext(GlobalContext)



    return (

        <>
            <section className="container">
                <h2 className="text-center text-white">Game Catalogue</h2>



                <div>
                    <form>
                        <input type="radio" className="btn-check" name="options-base" id="radio-title" autoComplete="off" value="title" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn" htmlFor="radio-title">Nome</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-price" autoComplete="off" value="price" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn" htmlFor="radio-price">Prezzo</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-date" autoComplete="off" value="created_at" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn" htmlFor="radio-date">Uscita</label>
                    </form>

                    <form>
                        <input type="radio" className="btn-check" name="options-base" id="radio-asc" autoComplete="off" value="ASC" onChange={(e) => setOrderByDirection(e.target.value)} />
                        <label className="btn" htmlFor="radio-asc">Crescente</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-desc" autoComplete="off" value="DESC" onChange={(e) => setOrderByDirection(e.target.value)} />
                        <label className="btn" htmlFor="radio-desc">Decrescente</label>
                    </form>
                </div>

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