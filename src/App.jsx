import { useEffect, useState } from "react";
import "./App.css"

function Card({updateBoard,index,pokemon}) {

   const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className="card" onClick={handleClick}>
       <h2>{pokemon?.name || "Loading..."}</h2>
      {pokemon?.sprites ? <img className="pokemon" src={pokemon.sprites.front_default} alt="Random Gif" /> : <p>Loading...</p>}
          </div>
     
  );
}
const dificults= {
  easy:8,
  medium:16,
  hard:24
}

export default function App (){
  const [board, setBoard]= useState([]);
  const [found,setFound] = useState([])
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newGame, setNewGame] = useState(false);
    const [winner, setWinner] = useState(null)

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const promises= Array.from({length:dificults.hard}, async ()=>{
        const random =Math.floor( Math.random() *  700+1)
       const res= await fetch("https://pokeapi.co/api/v2/pokemon/"+random)
       return res.json();
        });
        const results= await Promise.all(promises);
        setBoard(results)
      } catch (error) {
        console.log(error);
      } 
    };
    fetchResults();
  }, [newGame]);

  const restart =() =>{
    setCounter(0)
    setFound([])
    setBoard([])
    setWinner(null)
    setNewGame(!newGame)
  }

  const updateBoard = (index) =>{
    const newBoard = [...board];
        const newFound = found;
       if (newFound.includes(newBoard[index].id)) {
        return restart();
       }
        newFound.push(newBoard[index].id);  
            setCounter(count => count + 1)         
      newFound.push(newBoard[index].id);
      setFound(newFound);
    shuffleArray(newBoard);
        setBoard(newBoard);
        
  }
   if (counter == board.length) {
          console.log("you win")
        }
  if (counter>highScore) {
        setHighScore(counter)
       }

   
    return (
      <>
      <h1>Pokemon Memory Game</h1>
      <h2>Get points by clicking on a pokemon but don't click on any more than once!</h2>
    <div className="Board">
     {board.map((pokemon,index) =>{
        return(
          <Card key={index} pokemon={pokemon} index={index} updateBoard={updateBoard} ></Card>
        )
      })} 
    </div>
     <div className="scores">
      <p className="score">Current Score: {counter} </p>
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
