import { useContext } from "react";
import GlobalContext from "../contexts/globalContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

function WishlistButton({ gameId }) {
  const { toggleWishlist, isInWishlist } = useContext(GlobalContext);
  const checked = isInWishlist(gameId);

  return (
    <label className="d-flex justify-content-center align-items-center gap-2 btn ">
      <input
        type="checkbox"
        className="btn-check"
        checked={checked}
        onChange={() => toggleWishlist(gameId)}
      />
      <span
        className={`btn btn-sm ${checked
          ? 'btn-warning '
          : 'bg-warning'
          }`}
      >
        <FontAwesomeIcon
          icon={checked ? fasHeart : farHeart}
          className="fs-4 px-5 py-1"
          style={{ color: checked ? 'red' : 'black' }}
        />
      </span>
    </label>
  );
}

export default WishlistButton;