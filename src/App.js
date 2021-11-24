import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import Avarta from './components/avarta';
import Cell from './components/cell';
import {Graph,astar} from 'javascript-astar';
import block1 from './assets/block1.png';
import block2 from './assets/block2.png';
function App() {
  const rowCount = 12;
  const columnCount = 10;
  const step = 80;
  const defaultGrid = [
    [1,1,1,1,1,1,1,1,0,0],
    [1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,0,0],
    [0,0,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
  ];
  const [mapGrid, setMapGrid] = useState(defaultGrid);
  const [mapArr, setMapArr] = useState([]);
  useEffect(()=>{
    const _arr = [].concat.apply([],mapGrid);
    setMapArr(_arr);
  },[mapGrid]);
  const [targetGrid, setTargetGrid] = useState(null);
  const switchWallHandler = (isWall, rowIndex, columnIndex) => {
    if(isEditMode){
      const copyMapGrid = JSON.parse(JSON.stringify(mapGrid));
      copyMapGrid[rowIndex][columnIndex] = isWall ? 0 : 1;
      setMapGrid(copyMapGrid);
    }else{
      setTargetGrid({
        row: rowIndex,
        col: columnIndex,
        isWall: isWall
      });
      const startGrid = positionToGrid(currentPlayer);
      const endGrid = {row: rowIndex, col: columnIndex};
      const path = findPath(startGrid, endGrid);
      console.log('path', path);
      if(path.length > 0){
        moveByPath(path, currentPlayer);
      }
    }
  }
  const [avarta1, setAvarta1] = useState('https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80');
  const [avarta2, setAvarta2] = useState('https://images.unsplash.com/photo-1611403119860-57c4937ef987?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80');
  const man = useRef(null);
  const woman = useRef(null);
  useEffect(()=>{
    if(man.current){
      man.current.style.top = 0;
      man.current.style.left = 0;
    }
  },[man.current]);
  useEffect(()=>{
    if(woman.current){
      woman.current.style.top = '80px';
      woman.current.style.left = 0;
      // setTimeout(()=>{
      //   moveLeft(woman.current);
      //   moveDown(man.current);
      // },2000)
    }
  },[woman.current])

  const move = (direction,ele) => {
    let current = '';
    current = parseInt(current);
    let _step = step;
    if(direction === 'left' || direction === 'up'){
      _step =  0 - step;
    }
    if(direction === 'left' || direction === 'right'){
      current = ele.style['left'].split('px')[0];
      current = parseInt(current);
      current = current + _step;
      if(current < 0){
        current = 0;
      }
      ele.style['left'] = current + 'px';
    }else{
      current = ele.style['top'].split('px')[0];
      current = parseInt(current);
      current = current + _step;
      if(current < 0){
        current = 0;
      }
      ele.style['top'] = current + 'px';
    }
  }

  const moveLeft = (ele) => {
    move('left', ele);
  }
  const moveUp = (ele) => {
    move('up', ele);
  }
  const moveRight = (ele) => {
    move('right', ele);
  }
  const moveDown = (ele) => {
    move('down', ele);
  }
  //let currentPlayer;
  const  [currentPlayer, setCurrentPlayer] = useState(null);
  const clickPlayer = (playerEle) => {
    console.log(playerEle);
    //currentPlayer = playerEle.current;
    setCurrentPlayer(playerEle.current);
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const changeModeHandler = (e) => {
    console.log(e.target.checked);
    setIsEditMode(e.target.checked);
  }
  
  const positionToGrid = (ele) => {
    const top = ele.style['top'].split('px')[0];
    const left = ele.style['left'].split('px')[0];
    return {row: Math.floor(top/step), col: Math.floor(left/step)}
  }

  const findPath = (start, end) => {
    const graph = new Graph(mapGrid);
    const startGrid = graph.grid[start.row][start.col];
    const endGrid = graph.grid[end.row][end.col];
    const result = astar.search(graph, startGrid, endGrid);
    console.log(result);
    const _arr = result.map((item) => { 
      return {row: item.x, col: item.y};
    });
    const fullPath = [start].concat(_arr);
    console.log('fullpath',fullPath);
    const moves = [];
    fullPath.reduce((previousGrid, currentGrid, currentIndex) => {
      if(currentIndex > 0){
        let move = '';
        if(currentGrid.row === previousGrid.row){
          move = currentGrid.col > previousGrid.col ? 'right' : 'left';
        }
        if(currentGrid.col === previousGrid.col){
          move = currentGrid.row > previousGrid.row ? 'down' : 'up';
        }
        moves.push(move);
      }
      return currentGrid;
    })
    return moves;
  }

  const moveByPath = (path, ele) => {
    const direction = path.shift();
    move(direction,ele);
    setTimeout(()=>{
      if(path.length > 0){
        moveByPath(path, ele);
      }
    },500);
  }

  
  return (
    <div className="App">
      <div>
        <input type="checkbox" checked={isEditMode} onChange={changeModeHandler}/>Edit Mode
        <button onClick={() => moveRight(currentPlayer)}>right</button>
        <button onClick={() => moveLeft(currentPlayer)}>left</button>
        <button onClick={() => moveUp(currentPlayer)}>up</button>
        <button onClick={() => moveDown(currentPlayer)}>down</button>
      </div>
      <div className="main">
        { !isEditMode &&
        <>
        <div ref={woman} className="player">
          <Avarta src={avarta1} onClick={()=> clickPlayer(woman)}></Avarta>
        </div>
        <div ref={man} className="player">
          <Avarta src={avarta2} onClick={()=> clickPlayer(man)}></Avarta>
        </div>
        <div className="room" style={{top:0,left:'640px'}}>
          <img className="block1" src={block1}></img>
        </div>
        <div className="room" style={{top:160,left:0}}>
          <img className="block2" src={block2}></img>
        </div>
        </>
      }
        <div className="map">
          {
              mapArr.map((cell,index)=>{
                const rowIndex = Math.floor(index / columnCount);
                const columnIndex = index % columnCount;
                return (
                  <Cell wall={cell === 0 ? true:false} 
                    rowIndex={rowIndex} 
                    columnIndex={columnIndex}
                    switchWall={switchWallHandler} showInfo={isEditMode}>
                    
                  </Cell>
                )
              })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
