import { useEffect, useState } from "react"
import axios from "axios"



function WishListPage() {

  const [wishListGames, setWishListGames] = useState([]);


  useEffect(() => {
    const storedGames = localStorage.getItem("wishListGames");


    if (storedGames) {
      setWishListGames(JSON.parse(storedGames));
    }
  }, []);

  const gamesA = [{
    id: 6,
    title: "gioco di provaA",
    description: "Simulatore di costruzione e gestione città",
    price: "29.99",
    platform: "PC",
    slug: "cities-skylines",
    image: "cities_skylines.jpg",
    created_at: "2015-03-10T13:00:00.000Z",
    updated_at: "2025-05-28T06:08:26.000Z",
    discount: 10,
    discount_start: "2024-07-31T22:00:00.000Z",
    discount_finish: "2024-08-31T21:59:59.000Z",
    genres_list: "Simulation"
  },
  {
    id: 5,
    title: "gioco di provaA",
    description: "Action-adventure ambientato nel Giappone feudale",
    price: "59.99",
    platform: "PlayStation 5",
    slug: "ghost-of-tsushima",
    image: "ghost_tsushima.jpg",
    created_at: "2020-07-17T07:00:00.000Z",
    updated_at: "2025-05-28T06:08:26.000Z",
    discount: 0,
    discount_start: null,
    discount_finish: null,
    genres_list: "Action, Adventure"
  }]

  const gamesB = [{
    id: 10,
    title: "gioco di provaB",
    description: "Simulatore di costruzione e gestione città",
    price: "29.99",
    platform: "PC",
    slug: "cities-skylines",
    image: "cities_skylines.jpg",
    created_at: "2015-03-10T13:00:00.000Z",
    updated_at: "2025-05-28T06:08:26.000Z",
    discount: 10,
    discount_start: "2024-07-31T22:00:00.000Z",
    discount_finish: "2024-08-31T21:59:59.000Z",
    genres_list: "Simulation"
  },
  {
    id: 5,
    title: "gioco di provaB",
    description: "Action-adventure ambientato nel Giappone feudale",
    price: "59.99",
    platform: "PlayStation 5",
    slug: "ghost-of-tsushima",
    image: "ghost_tsushima.jpg",
    created_at: "2020-07-17T07:00:00.000Z",
    updated_at: "2025-05-28T06:08:26.000Z",
    discount: 0,
    discount_start: null,
    discount_finish: null,
    genres_list: "Action, Adventure"
  }]
  console.log(gamesA.includes({ id: 6 }))

  function storeAGames() {
    localStorage.setItem("wishListGames", JSON.stringify(wishListGames));
    console.log('giochi aggiunti')
  }


  function storeBGames() {
    localStorage.setItem("wishListGames", JSON.stringify(gamesB));
    console.log('giochi aggiunti')
  }

  function deleteGames() {
    localStorage.removeItem("wishListGames");
    console.log('giochi eliminati')
  }

  return (
    <>
      <h2>WishList</h2>


      <button onClick={storeAGames}>
        aggiungi giochi A
      </button>



      <button onClick={storeBGames}>
        aggiungi giochi B
      </button>

      <button onClick={deleteGames}>
        rimuovi
      </button>


      <div className="row row-gap-3 mb-5 column-gap-2 d-flex justify-content-center">
        {wishListGames.map(game =>
          <div className="card bg-dark col-lg-3 col-md-4 text-white" key={game.id}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <figure className="mt-2"><img src={game.imagePath} className="card-img-top " alt={game.title} /></figure>
              <h5 className="card-title fw-bold pt-2">{game.title}</h5>
              <p className="card-text"><strong>Console:</strong> {game.platform}</p>
              <p className="card-text fw-bold">{game.price} €</p>
              <button type="button" className="btn btn-warning fw-bold">Dettaglio Prodotto</button>
            </div>
          </div>
        )}
      </div>
    </>
  )

}

export default WishListPage