import { Link } from "react-router-dom";

function Card({ data }) {
    const {
        id,
        title,
        imagePath,
        price: rawPrice,
        discount: rawDiscount,
        platform,
    } = data;


    const price = Number(rawPrice) || 0;
    const discount = Number(rawDiscount) || 0;

    const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

    return (
        <div className="card bg-dark col-lg-3 col-md-4 text-white shadow position-relative">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <figure className="mt-2 position-relative">
                    <img src={imagePath} className="card-img-top" alt={title} />
                    {discount > 0 && (
                        <span
                            className="position-absolute bg-warning discount text-dark fw-bold p-2 rounded"
                            style={{ top: "10px", left: "10px", zIndex: 10 }}
                        >
                            -{discount}%
                        </span>
                    )}
                </figure>

                <h5 className="card-title fw-bold pt-2">{title}</h5>
                <div className="mt-auto d-flex flex-column justify-content-center align-items-center">
                    <p className="card-text mb-1 pb-3">
                        {discount > 0 ? (
                            <>
                                <span className="text-decoration-line-through text-white me-2">
                                    {price.toFixed(2)} €
                                </span>
                                <span className="text-warning fw-bold">
                                    {discountedPrice.toFixed(2)} €
                                </span>
                            </>
                        ) : (
                            <span>{price.toFixed(2)} €</span>
                        )}
                    </p>

                    <p className="card-text">
                        <strong>Console:</strong> {platform}
                    </p>

                    <Link to={`/games/${id}`} className="btn btn-warning">
                        Dettaglio Prodotto
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;