function FinishedScreen({ totalPoints, points, highScore, dispatch }) {
  const avgPoints = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        Your Score <strong>{points}</strong> out of {totalPoints} ({avgPoints}%)
      </p>

      <p className="highscore">Highscore {highScore} Points</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}

export default FinishedScreen;
