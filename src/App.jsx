import { useEffect, useState } from "react";
import "./App.css"

function Card({updateBoard,index}) {

   const handleClick = () => {
    updateBoard(index)
  }
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    let ignore = false;
    const fetchResults = async () => {
      try {
        const random =Math.floor( Math.random() *  700+1)
        fetch("https://pokeapi.co/api/v2/pokemon/"+random)
        .then(res => res.json())
        .then(data => ignore && setPokemon(data) )
      } catch (error) {
        console.log(error);
      }
      
    };
    fetchResults();
     return () => {
      ignore = true;}
  }, []);

  return (
    <div className="card" onClick={handleClick}>
       <h2>{pokemon.name}</h2>
      {pokemon.sprites ? <img src={pokemon.sprites.front_default} alt="Random Gif" /> : <p>Loading...</p>}
          </div>
     
  );
}


export default function App (){
  const [board, setBoard]= useState(Array(8).fill(null));
  const [found,setFound] = useState([])
  const [counter, setCounter] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const restart =() =>{
    setCounter(0)
    setFound([])
    setBoard(Array(8).fill(null))
  }

  const updateBoard = (index) =>{
    const newBoard = [...display];
        const newFound = found;
       if (newFound.includes(newBoard[index].key)) {
        console.log("repeated")
        return restart();
       }
     
        newFound.push(newBoard[index].key);  
            setCounter(count => count + 1)
              
      newFound.push(newBoard[index].key);
      setFound(newFound);
    shuffleArray(newBoard);
        setBoard(newBoard);
       
  }
  if (counter>highScore) {
        setHighScore(counter)
       }

    const display = board.map((_,index) =>{
        return(
          <Card key={index} index={index} updateBoard={updateBoard} ></Card>
        )
      }) 
    return (
      <>
      <h1>Pokemon Memory Game</h1>
      <h2>Get points by clicking on a Pokemon but don't click on any more than once!</h2>
    <div className="Board">
      {board[0]? board :display}
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
