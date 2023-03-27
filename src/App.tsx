import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./Routes/Router";

import { Counter } from "./features/counter/Counter";


function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
