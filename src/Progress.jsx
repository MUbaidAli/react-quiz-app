function Progress({ curQuestion, numQuestions, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={curQuestion + Number(answer !== null)}
      />
      <p>
        Question <strong>{curQuestion + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
