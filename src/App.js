import './App.css';
import Home from "./Home";
import Questions from "./Questions";
import Result from "./Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/questions' element={<Questions />} />
        <Route exact path='/result' element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
