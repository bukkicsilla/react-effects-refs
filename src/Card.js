import "./Card.css";
const Card = ({ title = "card", image }) => {
  return (
    <div className="Card">
      <img src={image} alt={title} />
    </div>
  );
};

export default Card;
