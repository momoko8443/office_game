
function Avarta(props) {
    return (
      <div className="avarta" onClick={()=> props.onClick && props.onClick()}>
          <img className="avartaImg" src={props.src}/>
      </div>
    );
  }
  
  export default Avarta;
  