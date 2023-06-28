import { useEffect, useReducer, useRef } from 'react';
import './App.css';

function reducer(state, action){
switch(action.type){
  case "START": return {...state, isTicking:true};// {clock: state.clock +1}
  case "PAUSE": return {...state, isTicking:false};//{isTicking: false}
  case "RESET": return {clock: 0, isTicking:false};//{clock: 0}
  case "TICK": return {...state, clock: state.clock+1}
  default:return state;
}
}

//Our initial state, we pass it to <p></p>
const initialState = {
  clock:0,
  isTicking:false //we will start it with a button
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);//(reducer,{clock:0, isTicking: false })
  
  const myTimerRef = useRef(0);

  useEffect(()=>{
    if (!state.isTicking) 

    return
    myTimerRef.current = setInterval(()=>dispatch({type:"TICK"}), 1000);
    return()=>{
      clearInterval(myTimerRef.current);
      myTimerRef.current = 0
    }
  }, [state.isTicking])

  return (
    <div className="App">
<p>{state.clock}s</p>
<button onClick={()=> dispatch({type:"START"})}>START</button>
<button onClick={()=> dispatch({type:"PAUSE"})}>PAUSE</button>
<button onClick={()=> dispatch({type:"RESET"})} >RESET</button>
    </div>
  );
}

export default App;
