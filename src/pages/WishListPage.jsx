import { useEffect, useState, useContext, useMemo } from "react"
import axios from "axios"
import GlobalContext from '../contexts/globalContext';
import WishlistButton from "../components/WishListButton";


function WishListPage() {

  const { wishListGames, setWishListGames } = useContext(GlobalContext);

  // necessaria perchè il games in contesto globale potrebbe essere filtrato, ma è sempre necessario fare un confronto tra TUTTI i giochi
  const [games, setGames] = useState([]);

  const gamesUrl = 'http://localhost:3000/games';

  // al montaggio del componente fa un fetch degli ID salvati in localStorage
  useEffect(() => {
    const storedIds = localStorage.getItem("wishListGames")
    if (storedIds) {
      setWishListGames(JSON.parse(storedIds))
    }
  }, []);

  // chiamata per recuperare TUTTI i giochi
  useEffect(() => {
    axios.get(gamesUrl)
      .then(res => {
        setGames(res.data)
      })
      .catch(err => console.error(err));
  }, [])

  // verifica della presenza di giochi nella wishlist, viene ricalcolato sempre e solo quando [games, wishListGames] sono modificati
  // useMemo serve a sostituire il lavoro di useEffect + useState
  const gamesInWishlist = useMemo(() => {
    if (!games.length || !wishListGames.length) return [];
    return games.filter(game => wishListGames.includes(Number(game.id)));
  }, [games, wishListGames]);


  return (
    <>
      <h2>WishList</h2>


      <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
        {gamesInWishlist.map(game =>
          <div className="card bg-dark col-lg-3 col-md-4 text-white" key={game.id}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <figure className="mt-2"><img src={game.imagePath} className="card-img-top " alt={game.title} /></figure>
              <h5 className="card-title fw-bold pt-2">{game.title}</h5>
              <p className="card-text"><strong>Console:</strong> {game.platform}</p>
              <p className="card-text fw-bold">{game.price} €</p>
              <Link to={`/games/${game.id}`} className="btn btn-warning fw-bold">Dettaglio Prodotto</Link>

              <WishlistButton gameId={game.id} />
            </div>
          </div>
        )}
      </div>
    </>
  )

}

export default WishListPage