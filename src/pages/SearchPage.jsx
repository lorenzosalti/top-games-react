import GlobalContext from '../contexts/globalContext';
import { useContext, useState } from 'react';
import Search from '../components/Search';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

function SearchPage() {

    const { games, orderBy, setOrderBy, orderByDirection, setOrderByDirection } = useContext(GlobalContext);
    const { id } = useParams();

    // Stato locale per il filtro promozioni
    const [showOnlyDiscounted, setShowOnlyDiscounted] = useState(false);

    // Filtro i giochi in base al filtro attivo
    let filteredGames = showOnlyDiscounted
        ? games.filter(game => game.discount && game.discount > 0)
        : games;



    return (
        <>
            <section className="container">
                <Search />
                <h2 className="text-center text-white fs-1">Catalogo Giochi</h2>


                <div className="d-flex justify-content-center align-items-center my-3">
                    <label className="form-check-label text-white me-3 fw-bold" htmlFor="discountSwitch">
                        Solo videogiochi in offerta:
                    </label>

                    <div className="form-check form-switch">
                        <input
                            className={`form-check-input bg-warning border-warning ${!showOnlyDiscounted ? 'opacity-50' : ''}`}
                            type="checkbox"
                            id="discountSwitch"
                            checked={showOnlyDiscounted}
                            onChange={() => setShowOnlyDiscounted(prev => !prev)}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-around">
                    <div className="text-white fw-bold text-align-center pt-1">Ordina per:</div>

                </div>

                <div className="d-flex justify-content-around">
                    <div className="d-flex m-2 ">
                        <form>
                            <input
                                type="radio"
                                className="btn-check "
                                name="options-base"
                                id="radio-title"
                                autoComplete="off"
                                value="title"
                                onChange={(e) => setOrderBy(e.target.value)}
                                checked={orderBy === "title"}
                            />
                            <label className="btn text-black bg-warning border-3 me-3 fs-5  m-1" htmlFor="radio-title">Nome</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="options-base"
                                id="radio-price"
                                autoComplete="off"
                                value="price"
                                onChange={(e) => setOrderBy(e.target.value)}
                                checked={orderBy === "price"}
                            />
                            <label className="btn text-black bg-warning border-3 me-3 fs-5  m-1" htmlFor="radio-price">Prezzo</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="options-base"
                                id="radio-date"
                                autoComplete="off"
                                value="created_at"
                                onChange={(e) => setOrderBy(e.target.value)}
                                checked={orderBy === "created_at"}
                            />
                            <label className="btn text-black bg-warning border-3 me-3 fs-5  m-1" htmlFor="radio-date">Data di uscita</label>
                        </form>
                    </div>

                    <div className="d-flex m-2">
                        <form>
                            <input
                                type="radio"
                                className="btn-check"
                                name="options-base"
                                id="radio-asc"
                                autoComplete="off"
                                value="ASC"
                                onChange={(e) => setOrderByDirection(e.target.value)}
                                checked={orderByDirection === "ASC"}
                            />
                            <label className="btn text-black bg-primary border-3 ms-3 fs-5 m-1" htmlFor="radio-asc">Ordine crescente</label>

                            <input
                                type="radio"
                                className="btn-check"
                                name="options-base"
                                id="radio-desc"
                                autoComplete="off"
                                value="DESC"
                                onChange={(e) => setOrderByDirection(e.target.value)}
                                checked={orderByDirection === "DESC"}
                            />
                            <label className="btn bg-primary text-black border-3 ms-3 fs-5 m-1" htmlFor="radio-desc">Ordine decrescente</label>
                        </form>
                    </div>
                </div>

                <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center mt-3">
                    {filteredGames.map(game => <Card data={game} key={game.id} />)}
                </div>
            </section>
        </>
    );
}

export default SearchPage;

