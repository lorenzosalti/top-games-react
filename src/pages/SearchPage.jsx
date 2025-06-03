import GlobalContext from '../contexts/globalContext';
import { useContext } from 'react';
import Search from '../components/Search';
import { useParams } from 'react-router-dom';
import Card from '../components/Card';

function SearchPage() {

    const { games, orderBy, setOrderBy, orderByDirection, setOrderByDirection } = useContext(GlobalContext);

    const { id } = useParams();

    console.log(orderBy);

    return (

        <>
            <section className="container">
                <h2 className="text-center text-white">Catalogo Giochi</h2>
                <Search />
                <div className="d-flex justify-content-around">
                    <div className="text-white fw-bold text-align-center pt-1">Ordina per:</div> <div className="text-white fw-bold pe-2 pt-1">Ordina per:</div>
                </div>
                <div className="d-flex justify-content-around">


                    <div className="d-flex m-2 ">

                        <form>
                            <input type="radio" className="btn-check " name="options-base" id="radio-title" autoComplete="off" value="title" onChange={(e) => setOrderBy(e.target.value)} checked={orderBy === "title"} />
                            <label className="btn text-black bg-warning border-3 me-3" htmlFor="radio-title">Nome</label>

                            <input type="radio" className="btn-check" name="options-base" id="radio-price" autoComplete="off" value="price" onChange={(e) => setOrderBy(e.target.value)} checked={orderBy === "price"} />
                            <label className="btn text-black bg-warning border-3 me-3" htmlFor="radio-price">Prezzo</label>

                            <input type="radio" className="btn-check" name="options-base" id="radio-date" autoComplete="off" value="created_at" onChange={(e) => setOrderBy(e.target.value)} checked={orderBy === "created_at"} />
                            <label className="btn text-black bg-warning border-3 me-3" htmlFor="radio-date">Data di uscita</label>
                        </form>
                    </div>


                    <div className="d-flex m-2">

                        <form>
                            <input type="radio" className="btn-check" name="options-base" id="radio-asc" autoComplete="off" value="ASC" onChange={(e) => setOrderByDirection(e.target.value)} checked={orderByDirection === "ASC"} />
                            <label className="btn text-black bg-primary border-3 ms-3" htmlFor="radio-asc">Ordine crescente</label>

                            <input type="radio" className="btn-check" name="options-base" id="radio-desc" autoComplete="off" value="DESC" onChange={(e) => setOrderByDirection(e.target.value)} checked={orderByDirection === "DESC"} />
                            <label className="btn bg-primary text-black border-3 ms-3" htmlFor="radio-desc">Ordine decrescente</label>
                        </form>
                    </div>
                </div>

                <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
                    {games.map(game => <Card data={game} key={game.id} />)}
                </div>


            </section >
        </>
    );

};





export default SearchPage;