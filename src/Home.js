import './App.css';
import questionsJSON from './questions.json';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
          <h1>Spiritual Gift Survey</h1>
          <p>
            There are {questionsJSON.length} questions. The scores are from strongly disagree (1) to strongly agree (5).<br />
            Answer what you think describes you the best!
          </p>
        <Link className="Link-button" to="/questions">
          Begin
        </Link>
      </header>
    </div>
  );
}

export default Home;
