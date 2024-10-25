import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});

  // Load JSON data when the app starts
  useEffect(() => {
    fetch("/picks.json")
      .then((response) => response.json())
      .then((data) => setPlayersData(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  // Toggle row expansion
  const toggleRow = (index) => {
    setExpandedRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Calculate leaderboard
  const leaderboard = playersData.map((player) => {
    const winPercentage = ((player.timesWon / player.gamesPlayed) * 100).toFixed(2);
    return {
      name: player.name,
      gamesPlayed: player.gamesPlayed,
      timesWon: player.timesWon,
      winPercentage,
    };
  });

  return (
    <div className="App">
      <h1 className="app-title">Hockey Pool</h1>

      <div className="total-pot">
        Total Pot: $220
      </div>

      {/* Player Picks Table */}
      <table className="picks-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Friday Picks</th>
            <th>Saturday Picks</th>
            <th>Sunday Picks</th>
            <th></th> {/* Column for expand button */}
          </tr>
        </thead>
        <tbody>
          {playersData.map((player, index) => (
            <React.Fragment key={index}>
              <tr className="player-row">
                <td className="player-name">{player.name}</td>

                {/* Friday Picks */}
                <td className="picks-column">
                  {player.fridayPicks.slice(0, 1).map((pickData, i) => (
                    <div key={i} className="game-pick">
                      {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                    </div>
                  ))}
                  {expandedRows[index] &&
                    player.fridayPicks.slice(1).map((pickData, i) => (
                      <div key={i} className="game-pick">
                        {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                      </div>
                    ))}
                </td>

                {/* Saturday Picks */}
                <td className="picks-column">
                  {player.saturdayPicks.slice(0, 1).map((pickData, i) => (
                    <div key={i} className="game-pick">
                      {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                    </div>
                  ))}
                  {expandedRows[index] &&
                    player.saturdayPicks.slice(1).map((pickData, i) => (
                      <div key={i} className="game-pick">
                        {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                      </div>
                    ))}
                </td>

                {/* Sunday Picks */}
                <td className="picks-column">
                  {player.sundayPicks.slice(0, 1).map((pickData, i) => (
                    <div key={i} className="game-pick">
                      {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                    </div>
                  ))}
                  {expandedRows[index] &&
                    player.sundayPicks.slice(1).map((pickData, i) => (
                      <div key={i} className="game-pick">
                        {pickData.game}: <strong className="picked-team">{pickData.pick}</strong>
                      </div>
                    ))}
                </td>

                {/* Expand/Collapse Button */}
                <td>
                  <button
                    className="expand-button"
                    onClick={() => toggleRow(index)}
                  >
                    {expandedRows[index] ? "Show Less" : "Show More"}
                  </button>
                </td>
              </tr>

              {/* Blue bar separator */}
              <tr className="separator-row">
                <td colSpan="5" className="blue-bar"></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Leaderboard */}
      <h2 className="leaderboard-title">Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Win %</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard
            .sort((a, b) => b.winPercentage - a.winPercentage)
            .map((player, index) => (
              <tr key={index}>
                <td className="player-name">{player.name}</td>
                <td>{player.gamesPlayed}</td>
                <td>{player.timesWon}</td>
                <td>{player.winPercentage}%</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
