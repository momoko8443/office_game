import { createRef, useEffect, useRef, useState } from 'react';
import './App.css';
import Avarta from './components/avarta';
import Cell from './components/cell';

function App() {
  const rowCount = 12;
  const columnCount = 10;
  const defaultGrid = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1]
  ]
  const [mapGrid, setMapGrid] = useState(defaultGrid);
  const [mapArr, setMapArr] = useState([]);
  useEffect(()=>{
    const _arr = [].concat.apply([],mapGrid);
    setMapArr(_arr);
  },[mapGrid]);

  const switchWallHandler = (isWall, rowIndex, columnIndex) => {
    const copyMapGrid = JSON.parse(JSON.stringify(mapGrid));
    copyMapGrid[rowIndex][columnIndex] = isWall ? 0 : 1;
    setMapGrid(copyMapGrid);
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
      woman.current.style.top = 0;
      woman.current.style.left = '81px';
      setTimeout(()=>{
        moveLeft(woman.current);
        moveDown(man.current);
      },2000)
    }
  },[woman.current])

  const move = (direction,ele, step) => {
    let current = '';
    current = parseInt(current);
    if(direction === 'left' || direction === 'up'){
      step =  0 - step;
    }
    if(direction === 'left' || direction === 'right'){
      current = ele.style['left'].split('px')[0];
      current = parseInt(current);
      current = current + step;
      ele.style['left'] = current + 'px';
    }else{
      current = ele.style['top'].split('px')[0];
      current = parseInt(current);
      current = current + step;
      ele.style['top'] = current + 'px';
    }
    
  }

  const moveLeft = (ele) => {
    move('left', ele, 80);
  }
  const moveUp = (ele) => {
    move('top', ele, 80);
  }
  const moveRight = (ele) => {
    move('right', ele, 80);
  }
  const moveDown = (ele) => {
    move('down', ele, 80);
  }

  const clickPlayer = (playEle) => {
    console.log(playEle);
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const changeModeHandler = (e) => {
    console.log(e.target.checked);
    setIsEditMode(e.target.checked);
  }
  return (
    <div className="App">
      <div>
        <input type="checkbox" checked={isEditMode} onChange={changeModeHandler}/>Edit Mode
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
                    switchWall={switchWallHandler}>
                    
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
