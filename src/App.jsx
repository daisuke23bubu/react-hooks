import { useState, useContext } from "react";
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from "react";
import MyContext from "./main";
import { useRef } from "react";
import { useReducer } from "react";
import { useMemo } from "react";
import SomeChild from "./SomeChild";
import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const reducer = (state,action) => {
  switch(action.type){
    case "increment":
      return state+1;
    case "decrement":
      return state-1;
    default:
      return state;
  }
};

function App() {
  const [count,setCount] = useState(0);
  const myInfo = useContext(MyContext);
  const ref = useRef();
  const [state,dispatch] = useReducer(reducer,0);

  const handleClickPlus = () => {
    setCount(prevState => prevState + 1);
  };

  const handleClickMinus = () => {
    setCount(prevState => prevState - 1);
  };

  const handleRef = () => {
    console.log(ref.current.value);
  };

  useEffect(()=>{
    console.log("Hello Hooks")
  },[count]);

  //useMemo:メモリに保存する
  const [count01,setCount01] = useState(0);
  const [count02,setCount02] = useState(0);

  // const square= ()=>{
  //   let i = 0;
  //   while(i < 2){
  //     i++;
  //   }
  //   return count02*count02;
  // };

  const square= useMemo(()=>{
    let i = 0;
    while(i < 2){
      i++;
    }
    return count02*count02;
  },[count02])

  //useCallback 関数のメモ化
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert("これは重い処理です");
  // };
  const showCount = useCallback(() => { 
    alert("これは重い処理です。");
   },[counter]);

   //カスタムフック
   const [age, setAge] = useLocalStorage("age",24);

  return (
    <div className="App">
      <h1>useState,useEffect</h1>
      <button onClick={handleClickPlus}>＋</button>
      <button onClick={handleClickMinus}>－</button>
      <p>{count}</p>

      <hr />
      <h1>useContext</h1>
      <p>{myInfo.name}</p>

      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref}/>
      <button onClick={handleRef}>useRef</button>

      <hr />
      <h1>useReducer</h1>
      <p>{state}</p>
      <button onClick={()=> dispatch({type: "increment"})}>＋</button>
      <button onClick={()=> dispatch({type: "decrement"})}>－</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント01:{count01}</div>
      <div>カウント02:{count02}</div>
      <div>結果:{square}</div>
      <button onClick={()=> setCount01(count01+1)}>＋</button>
      <button onClick={()=> setCount02(count02+1)}>＋</button>

      <hr />
      <h1>useCallback</h1>
      <SomeChild showCount={showCount}/>

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick = {() => { setAge(80) }}>年齢をセット</button>
    </div>
  )
}

export default App
