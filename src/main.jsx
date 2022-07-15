import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createContext } from "react";

const myInfo = {
  name: "daisuke23bubu",
};

const MyContext = createContext(myInfo);

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyContext.Provider value={myInfo}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </MyContext.Provider>
)

export default MyContext;