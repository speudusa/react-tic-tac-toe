import {useState} from "react";

function Square({value, onClickSquare}) {
  return(
    <button className="square" onClick={onClickSquare}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  
  function handleClick(i){
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  winner ? status = "Winner: " + winner : status = "Next player: " + (xIsNext ? "X" : "O");
  
  return (
    <>
    <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClickSquare={() => handleClick(0)} />
        <Square value={squares[1]} onClickSquare={() => handleClick(1)} />
        <Square value={squares[2]} onClickSquare={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onClickSquare={() => handleClick(3)} />
        <Square value={squares[4]} onClickSquare={() => handleClick(4)} />
        <Square value={squares[5]} onClickSquare={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onClickSquare={() => handleClick(6)} />
        <Square value={squares[7]} onClickSquare={() => handleClick(7)} />
        <Square value={squares[8]} onClickSquare={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove ] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    
    const nextHistory = [...history.slice(0, currentMove +1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
    // return;
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    return;
  }

  const moves = history.map((squares, move) => {
    let description;
   (move > 0) ? description = "Go to move #" + move : description = "Go to game start";
   return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
   );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>

      </div>
    </div>
  );
}

function calculateWinner(squares){
  const lines = [
    // horizontal wins
    [0, 1, 2], 
    [3, 4, 5],
    [6, 7, 8], 
    // vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal wins
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i=0; i<lines.length; i++)
  {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}