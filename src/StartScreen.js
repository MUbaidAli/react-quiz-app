function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcoe To The React Quiz.</h2>
      <h3>{numQuestions} Quiz To Test Your React Mastry.</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
