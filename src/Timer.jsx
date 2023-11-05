import { useEffect } from "react";
function Timer({ numQuestions, dispatch, secRemaining }) {
  //   const totalTime = numQuestions * 60;
  //   console.log(totalTime);

  const minutes = secRemaining / 60;
  const seconds = secRemaining % 60;
  useEffect(() => {
    const timer = setInterval(function () {
      dispatch({ type: "tick" });
    }, 1000);

    return function () {
      clearInterval(timer);
    };
  }, [dispatch]);

  return (
    <div>{`${Math.floor(minutes).toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`}</div>
  );
}

export default Timer;
