import "./Card.css";
const Card = ({ title = "card", image, angle }) => {
  const transform = `rotate(${angle}deg)`;
  return (
    <div className="Card">
      <img src={image} alt={title} style={{ transform }} />
    </div>
  );
};

export default Card;
