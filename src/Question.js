import Footer from "./Footer";
import Timer from "./Timer";

function Question({
  secRemaining,
  question,
  dispatch,
  answer,
  curQuestion,
  numQuestions,
}) {
  return (
    <div>
      {/* {console.log(question)} */}
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            className={`btn btn-option ${i === answer ? "answer" : ""} ${
              answer !== null &&
              (i === question.correctOption ? "correct" : "wrong")
            }`}
            disabled={answer !== null}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {option}
          </button>
        ))}
      </div>

      <Footer>
        <>
          <Timer
            numQuestions={numQuestions}
            dispatch={dispatch}
            secRemaining={secRemaining}
          />
          {answer !== null && curQuestion < numQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "nextQuestion" })}
            >
              Next
            </button>
          )}
          {answer !== null && curQuestion === numQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: "finish" })}
            >
              Finish
            </button>
          )}
        </>
      </Footer>
    </div>
  );
}

export default Question;
