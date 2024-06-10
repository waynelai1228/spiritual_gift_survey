import './App.css';
import Home from "./Home";
import Questions from "./Questions";
import Result from "./Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/result' element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
