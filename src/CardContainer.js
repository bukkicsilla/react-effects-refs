import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardContainer.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
const API_DECK_URL = `${API_BASE_URL}/new/shuffle/`;

const CardContainer = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(API_DECK_URL);
        let { deck_id } = res.data;
        setDeckId(deck_id);
      } catch (e) {
        console.log("Error", e);
      }
    }
    getDeck();
  }, []);

  async function draw() {
    /*try {
      const res = await axios.get(API_DECK_URL);
      let { deck_id } = res.data;
      console.log(deck_id);
      const res2 = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`);
      let { suit, value } = res2.data.cards[0];
      console.log(`${value} of ${suit}`);
    } catch (e) {
      console.log("Error", e);
    }*/

    //console.log(deckId);
    try {
      const res = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);
      if (res.data.success) {
        //console.log("Success");
        setCards((cards) => [...cards, res.data.cards[0]]);
      } else {
        console.log("No more cards");
      }
    } catch (e) {
      console.log("Error", e);
    }
  }
  return (
    <div className="CardContainer">
      <button className="CardContainer-btn" onClick={draw}>
        Picking a Card
      </button>
      {cards.map((card) => (
        <Card
          key={card.code}
          title={card.suit + card.value}
          image={card.image}
        />
      ))}
    </div>
  );
};
export default CardContainer;
