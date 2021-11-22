
function Cell(props) {
  
  return (
    <div className={props.wall ? 'cellWall':'cell'} onClick={()=> props.switchWall && props.switchWall(!props.wall, props.rowIndex, props.columnIndex)}>
        <span>
            row: {props.rowIndex}
        </span>
        <span>
            col: {props.columnIndex}
        </span>
    </div>
  );
}

export default Cell;
