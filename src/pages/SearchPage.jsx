import { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';
import Search from '../components/Search';

function SearchPage() {
    const { games, setOrderBy, setOrderByDirection } = useContext(GlobalContext);



    return (

        <>
            <section className="container">
                <h2 className="text-center text-white">Game Catalogue</h2>
                <Search />
                <div className="d-flex justify-content-center m-4">
                    <div className="text-white fw-bold pe-2 pt-1">Filtra per:</div>
                    <form>
                        <input type="radio" className="btn-check " name="options-base" id="radio-title" autoComplete="off" value="title" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn text-black bg-warning me-2" htmlFor="radio-title ">Nome</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-price" autoComplete="off" value="price" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn text-black bg-warning me-2" htmlFor="radio-price">Prezzo</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-date" autoComplete="off" value="created_at" onChange={(e) => setOrderBy(e.target.value)} />
                        <label className="btn text-black bg-warning me-2" htmlFor="radio-date">Data di uscita</label>
                    </form>

                    <form>
                        <input type="radio" className="btn-check" name="options-base" id="radio-asc" autoComplete="off" value="ASC" onChange={(e) => setOrderByDirection(e.target.value)} />
                        <label className="btn text-black bg-warning me-2" htmlFor="radio-asc">Ordine crescente</label>

                        <input type="radio" className="btn-check" name="options-base" id="radio-desc" autoComplete="off" value="DESC" onChange={(e) => setOrderByDirection(e.target.value)} />
                        <label className="btn text-black bg-warning me-2" htmlFor="radio-desc">Ordine decrescente</label>
                    </form>
                </div>

                <div className="row row-gap-3 column-gap-2 d-flex justify-content-center">
                    {games.map(game =>
                        <div className="card bg-dark col-lg-3 col-md-4 text-white" key={game.id}>
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <img src={game.imagePath} className="card-img-top " alt={game.title} />
                                <h5 className="card-title fw-bold pt-2">{game.title}</h5>
                                <p className="card-text"><strong>Console:</strong> {game.platform}</p>
                                <p className="card-text">{game.description}</p>
                                <p className="card-text fw-bold">{game.price} €</p>
                                <button type="button" className="btn btn-warning fw-bold">Product details</button>
                            </div>
                        </div>
                    )}
                </div>

            </section >

        </>
    );

};





export default SearchPage;