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
const difficults= {
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
    const [winner, setWinner] = useState(false)
  const [difficult, setDifficult] = useState("easy");

  
  useEffect(() => {
    const lenght= difficults[difficult] ? difficults[difficult] :difficults.easy;
    const fetchResults = async () => {
      try {
        const promises= Array.from({length:lenght}, async ()=>{
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
  }, [newGame,difficult]);

  const restart =() =>{
    setCounter(0)
    setFound([])
    setBoard([])
    setWinner(false)
    setNewGame(!newGame)
  }

  const handleDifficult =(value)=>{
   setDifficult(value.target.value)
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
   if (counter == board.length && board.length>1 && winner==false) {
    setWinner(true)
        }
  if (counter>highScore) {
        setHighScore(counter)

       }

    return (
      <>
      <h1>Pokemon Memory Game</h1>
      <header>
      <h2>Get points by clicking on a pokemon but don't click on any more than once!</h2>
        <div className="difficultChooser">
  <label htmlFor="options">Choose a difficult: </label>
  <select id="options" defaultValue={"easy"} onChange={handleDifficult} name="options" >
    <option value="easy" >Easy</option>
    <option value="medium" >Medium</option>
    <option value="hard">Hard</option>
  </select>
  </div>

            </header>
    <div className="Board"  style={{gridTemplateColumns: difficult=="easy" ? "repeat(4, minmax(0, 1fr))" : "repeat(6, minmax(0, 1fr))" }} >
      {console.log(difficult=="easy" ? "repeat(4, minmax(0, 1+fr))" : "repeat(6, minmax(0, 1fr))")}
     {board.map((pokemon,index) =>{
        return(
          <Card key={index} pokemon={pokemon} grid index={index}  updateBoard={updateBoard} ></Card>
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
