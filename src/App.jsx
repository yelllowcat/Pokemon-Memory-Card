import { useEffect, useState } from "react";
import "./App.css";

function Card({ pokemon, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <h2>{pokemon?.name || "Loading..."}</h2>
      {pokemon?.sprites ? (
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default function App() {
  const [board, setBoard] = useState([]); // will store Pokémon objects
  const [found, setFound] = useState([]);
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Fetch 8 random Pokémon only once (when the game starts)
  useEffect(() => {
    const fetchPokemon = async () => {
      const promises = Array.from({ length: 8 }, async () => {
        const random = Math.floor(Math.random() * 700 + 1);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
        return res.json();
      });
      const results = await Promise.all(promises);
      setBoard(results);
    };
    fetchPokemon();
  }, []);

  const restart = () => {
    setCounter(0);
    setFound([]);
    setBoard([]); // clear board → triggers re-fetch
    // optionally re-fetch here:
    const fetchAgain = async () => {
      const promises = Array.from({ length: 8 }, async () => {
        const random = Math.floor(Math.random() * 700 + 1);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`);
        return res.json();
      });
      const results = await Promise.all(promises);
      setBoard(results);
    };
    fetchAgain();
  };

  const updateBoard = (index) => {
    const clicked = board[index];
    if (found.includes(clicked.name)) {
      console.log("repeated");
      return restart();
    }

    setFound([...found, clicked.name]);
    setCounter((c) => c + 1);

    const shuffled = shuffleArray([...board]);
    setBoard(shuffled);
  };

  if (counter > highScore) {
    setHighScore(counter);
  }

  return (
    <>
      <h1>Pokemon Memory Game</h1>
      <h2>
        Get points by clicking on a Pokemon but don't click on any more than
        once!
      </h2>
      <div className="Board">
        {board.map((pokemon, index) => (
          <Card
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => updateBoard(index)}
          />
        ))}
      </div>

      <div className="scores">
        <p className="score">Current Score: {counter}</p>
        <p className="score">High Score: {highScore}</p>
      </div>
    </>
  );
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
