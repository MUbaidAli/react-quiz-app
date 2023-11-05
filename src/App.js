import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";

import axios from "axios";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // loading , error,ready,active,finished
  status: "loading",
  curQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secRemaining: 0,
};

function reducer(curState, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...curState,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return { ...curState, status: "error" };
    case "start":
      return {
        ...curState,
        status: "active",
        curQuestion: 0,
        secRemaining: curState.questions.length * 30,
      };

    //grab qustion point section and +

    case "newAnswer":
      const questionAns = curState.questions[curState.curQuestion];

      return {
        ...curState,
        answer: action.payload,
        points:
          action.payload === questionAns.correctOption
            ? curState.points + questionAns.points
            : curState.points,
      };
    case "nextQuestion":
      return {
        ...curState,
        curQuestion: curState.curQuestion + 1,
        answer: null,
      };
    case "finish":
      return {
        ...curState,
        status: "finish",
        highScore:
          curState.highScore > curState.points
            ? curState.highScore
            : curState.points,
      };
    case "restart":
      return {
        ...initialState,
        highScore: curState.highScore,
        status: "ready",
        questions: curState.questions,
      };
    case "tick":
      return {
        ...curState,
        secRemaining: curState.secRemaining - 1,
        status: curState.secRemaining === 0 ? "finish" : curState.status,
      };

    default:
      throw new Error("Action Unknown");
  }
}

function App() {
  const [
    { questions, status, curQuestion, answer, points, highScore, secRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  // const questionAns = questions[curQuestion].correctOption;

  // console.log(questionAns, "here", answer);
  // console.log(questionAns === answer);
  const numQuestions = questions?.length;
  const totalPoints = questions?.reduce((acc, cur) => acc + cur.points, 0);

  // console.log(totalPoints, "total Points");

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.get("http://localhost:8000/questions");
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        // console.log(error.message);
      } finally {
      }
    }
    getData();
  }, []);

  return (
    <>
      <Header />

      <Main>
        {/* <h1>Test</h1> */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalPoints={totalPoints}
              curQuestion={curQuestion}
              numQuestions={numQuestions}
              points={points}
              answer={answer}
            />
            <Question
              curQuestion={curQuestion}
              question={questions[curQuestion]}
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              secRemaining={secRemaining}
            />
          </>
        )}

        {status === "finish" && (
          <FinishedScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}

export default App;
