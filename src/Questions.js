import './App.css';
import questionsJSON from './questions.json';
import { useState } from 'react';
import { Link } from "react-router-dom";

function Questions() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [optionLabels] = useState([1,2,3,4,5]);
  const [answers, setAnswers] = useState(Array(questionsJSON.length).fill(0));
  const [labelStyles, setLabelStyles] = useState(Array(5).fill("Link-button"));
  const [submitVisible, setSubmitVisible] = useState(false);

  function updateLabelStyles(answers: Array, questionNumber: Number) {
    let nextLabelStyles = Array(5).fill("Link-button");
    const currentAnswer = answers[questionNumber];
    if (currentAnswer != 0 && 1 <= currentAnswer <= 5) {
      nextLabelStyles[currentAnswer - 1] = "Link-button Link-button-selected";
    }
    setLabelStyles(nextLabelStyles);
  }

  function changeQuestion(change: number) {
    const nextQuestionNumber = questionNumber + change;
    const maxQuestionIndex = questionsJSON.length - 1;
    if (nextQuestionNumber < 0 || maxQuestionIndex < nextQuestionNumber) {
      console.log("invalid question change, number of question is " + questionsJSON.length);
    } else {
      setQuestionNumber(nextQuestionNumber);
      if (nextQuestionNumber == maxQuestionIndex) {
        setSubmitVisible(true);
      } else {
        setSubmitVisible(false);
      }
      updateLabelStyles(answers, nextQuestionNumber);
    }
  };

  function selectOption(event) {
    const id: Number = +event.target.id;
    console.log(questionNumber, id);

    if (!optionLabels.includes(id)) {
      console.log(optionLabels);
      console.log("Error, the option does not exist");
    }

    let nextAnswers = answers;
    nextAnswers[questionNumber] = id;

    setAnswers(nextAnswers);
    updateLabelStyles(nextAnswers, questionNumber);
    changeQuestion(1);
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Question {questionNumber + 1}</h1>
          <p>
            {questionsJSON[questionNumber].question}
          </p>

        <div className="Link-container">
          {[...Array(5)].map((_,i) => 
            <div key={i} id={optionLabels[i]} className={labelStyles[i]} onClick={(e) => selectOption(e)}>
              {optionLabels[i]}
            </div>
          )}
        </div>

        <div className="Link-container">
          <div className="Link-button" onClick={() => changeQuestion(-1)}>
            Prev
          </div>
          { !submitVisible &&
            (
              <div className="Link-button" onClick={() => changeQuestion(1)}>
                Next
              </div>
            ) }
          { submitVisible && 
            (
              <Link className="Link-button" to="/result" state={{ answers }}>
                Submit
              </Link>
            ) }
        </div>
      </header>
    </div>
  );
}

export default Questions;
