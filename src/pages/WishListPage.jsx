import { useEffect, useState, useContext } from "react"
import axios from "axios"
import GlobalContext from '../contexts/globalContext';

// test games
import testGames from '../../testGames.json'


function WishListPage() {
  console.log(testGames)
  const { wishListGames, setWishListGames } = useContext(GlobalContext);


  useEffect(() => {
    // test con prodotti in locale
    setWishListGames(testGames);


    // const storedGames = localStorage.getItem("wishListGames");

    // if (storedGames) {
    //   setWishListGames(JSON.parse(storedGames));
    // }
  }, []);


  useEffect(() => {
    localStorage.setItem("wishListGames", JSON.stringify(wishListGames));
  }, [wishListGames]);

  function toggleWishlist(id) {
    setWishListGames((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]);
  };

  function isInWishlist(id) { return wishListGames.includes(id) }

  return (
    <>
      <h2>WishList</h2>


      <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
        {wishListGames.map(game =>
          <div className="card bg-dark col-lg-3 col-md-4 text-white" key={game.id}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <figure className="mt-2"><img src={game.imagePath} className="card-img-top " alt={game.title} /></figure>
              <h5 className="card-title fw-bold pt-2">{game.title}</h5>
              <p className="card-text"><strong>Console:</strong> {game.platform}</p>
              <p className="card-text fw-bold">{game.price} €</p>
              <button type="button" className="btn btn-warning fw-bold">Dettaglio Prodotto</button>

              <label>
                <input type="checkbox" className="btn-check" checked={isInWishlist(game.id)} onChange={() => toggleWishlist(game.id)} />
                Wishlist
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  )

}

export default WishListPage