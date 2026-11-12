import { FaStar } from "react-icons/fa";

// shows `count` red stars
function Stars({ count }) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<FaStar key={i} />);
  }
  return <span className="stars">{stars}</span>;
}

export default Stars;
