import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./Routes/Router";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
