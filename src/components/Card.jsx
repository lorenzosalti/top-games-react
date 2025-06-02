import { Link } from "react-router-dom";

function Card({ data }) {

    const { id, title, imagePath, price, discount, platform } = data;

    return (

        <div className="card bg-dark col-lg-3 col-md-4 text-white shadow">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <figure className="mt-2">
                    <img src={imagePath} className="card-img-top " alt={title} />
                </figure>
                <h5 className="card-title fw-bold pt-2">{title}</h5>
                <div className='mt-auto d-flex flex-column justify-content-center align-items-center'>
                    <p className="card-text"><strong>Console:</strong> {platform}</p>
                    {discount > 0 ? (
                        <>
                            <p className="card-text mb-1 pb-3">
                                <span className="text-decoration-line-through text-white me-2">{price} €</span>
                                <span className="text-warning fw-bold">{(price - (price * discount / 100)).toFixed(2)} €</span>
                                <span className="card-text mb-2 rounded position-absolute bg-warning discount text-dark fw-bold p-2 ms-3">
                                    - {discount}%
                                </span>
                            </p>
                        </>
                    ) : (<div className='mb-3'>{price} €</div>)}
                    <Link to={`/games/${id}`} className="btn btn-warning">Dettaglio Prodotto</Link>

                </div>
            </div>
        </div>
    )
}


export default Card;