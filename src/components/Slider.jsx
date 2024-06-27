import { Link } from "react-router-dom";
import "../styles/Home.css";
import "../styles/App.css";

export function Slider({ items, linkBase, imageSource, imageAlt, itemName }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className="sliders">
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`${linkBase}/${item.id}`}>
            <img
              width={171}
              height={180}
              src={imageSource(item)}
              alt={imageAlt(item)}
            />
          </Link>
          {/* <h4>{itemName(item)}</h4> */}
        </li>
      ))}
    </ul>
  );
}
