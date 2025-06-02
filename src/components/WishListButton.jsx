import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";

function WishlistButton({ gameId }) {
  const { toggleWishlist, isInWishlist } = useContext(GlobalContext);
  const checked = isInWishlist(gameId);

  return (
    <label className="d-flex align-items-center gap-2 mt-2">
      <input
        type="checkbox"
        className="btn-check"
        checked={checked}
        onChange={() => toggleWishlist(gameId)}
      />
      <span className={`btn btn-warning btn-sm ${checked ? "btn-secondary bg-danger" : "btn-outline-secondary text-black"}`}>
        {checked ? "Rimuovi dalla Wishlist" : "Aggiungi alla Wishlist"}
      </span>
    </label>
  );
}

export default WishlistButton;