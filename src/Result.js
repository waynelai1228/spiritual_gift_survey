import './App.css';
import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';



function Result() {
  const { state } = useLocation();
  const [gifts] = useState([
                              {description: "Leadership", metrics: [5, 15, 26, 42, 64]},
                              {description: "Administration", metrics:[0, 16, 30, 46, 58]}, 
                              {description: "Teaching",metrics:[1, 17, 32, 60, 72]},
                              {description: "Knowledge",metrics:[8, 23, 38, 67, 78]},
                              {description: "Wisdom",metrics:[2, 18, 47, 61, 73]},
                              {description: "Prophecy",metrics:[9, 24, 39, 53, 68]},
                              {description: "Discernment",metrics:[10, 25, 40, 54, 69]},
                              {description: "Exhortation",metrics:[19, 33, 48, 62, 74]},
                              {description: "Shepherding",metrics:[3, 20, 34, 49, 75]},
                              {description: "Faith",metrics:[11, 27, 41, 55, 79]},
                              {description: "Evangelism",metrics:[4, 35, 50, 63, 76]},
                              {description: "Apostleship",metrics:[12, 28, 43, 56, 70]},
                              {description: "Service/Helps",metrics:[13, 29, 45, 57, 71]},
                              {description: "Mercy",metrics:[6, 21, 36, 51, 65]},
                              {description: "Giving",metrics:[7, 22, 37, 52, 66]},
                              {description: "Hospitality",metrics:[14, 31, 44, 59, 77]}
                            ])
  const [sort, setSort] = useState(false);
  const [sortedGiftScores, setSortedGiftScores] = useState([]);

  if(!state) { 
    return <Navigate to="/"/>
  }

  const answers = state.answers;

  let giftScores = Array(gifts.length).fill(0)
  function calculateScore(row: Number, metrics) {
    const sum = metrics.reduce(function (result, index) {
      return result + answers[index];
    }, 0);

    giftScores[row] = sum;

    try {
      localStorage.setItem('giftScores', JSON.stringify(giftScores));
    } catch (e) {
      console.error(e);
    }

    return sum;
  }

  function sortResult() {
    try {
      giftScores = JSON.parse(localStorage.getItem('giftScores'));
    } catch (e) {
      console.error(e);
    }
    const newSortedGiftScores = giftScores.map((_, i) => [i, _]).sort((a,b) => b[1] - a[1]);
    setSort(true);
    setSortedGiftScores(newSortedGiftScores);
  }

  return (
    <div className="App">
      <header className="App-header">
          <h1>Result</h1>
            <div className="Result-container">
              { !sort &&
                [...Array(gifts.length)].map((_,i) =>
                  <div key={i} className="">{gifts[i].description}: {calculateScore(i, gifts[i].metrics)}</div>
                )
              }
              { sort &&
                giftScores.map((_,i) =>
                  <div key={i} className="">{gifts[sortedGiftScores[i][0]].description}: {sortedGiftScores[i][1]}</div>
                )
              }
            </div>

          <div className="Toggle-container">
            <div className="Link-button" onClick={() => sortResult()}>
              Sort (Highest -> lowest)
            </div>
          </div>
      </header>
    </div>
  );
}

export default Result;
