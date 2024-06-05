import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./CardContainer.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
const API_DECK_URL = `${API_BASE_URL}/new/shuffle/`;

const CardContainer = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [angles, setAngles] = useState([]);
  const DEG_CHANGE = 42;
  const cardsRef = useRef(null);

  useEffect(() => {
    async function getDeck() {
      try {
        const res = await axios.get(API_DECK_URL);
        let { deck_id } = res.data;
        setDeckId(deck_id);
        for (let i = 0; i < 52; i++) {
          setAngles((angles) => [...angles, i * DEG_CHANGE]);
        }
      } catch (e) {
        console.log("Error", e);
      }
    }
    getDeck();
    return () => {
      clearInterval(cardsRef.current);
      cardsRef.current = null;
    };
  }, []);

  async function draw() {
    try {
      const res = await axios.get(`${API_BASE_URL}/${deckId}/draw/`);
      if (res.data.success) {
        setCards((cards) => [...cards, res.data.cards[0]]);
      } else {
        console.log("No more cards");
        clearInterval(cardsRef.current);
        cardsRef.current = null;
      }
    } catch (e) {
      console.log("Error", e);
    }
  }
  async function shuffle() {
    try {
      clearInterval(cardsRef.current);
      cardsRef.current = null;
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
      setCards([]);
    } catch (e) {
      console.log("Error", e);
    }
  }
  async function getCards() {
    try {
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
      //setCards([]);
      cardsRef.current = setInterval(() => {
        draw();
      }, 800);
    } catch (e) {
      console.log("Error", e);
    }
  }

  return (
    <div className="CardContainer">
      <button className="CardContainer-btn" onClick={draw}>
        Picking a Card
      </button>
      <button className="CardContainer-btn" onClick={shuffle}>
        Shuffle
      </button>
      <button className="CardContainer-btn" onClick={getCards}>
        Get Cards
      </button>
      {cards.map((card, idx) => (
        <Card
          key={card.code}
          title={card.suit + card.value}
          image={card.image}
          angle={angles[idx]}
        />
      ))}
    </div>
  );
};
export default CardContainer;
