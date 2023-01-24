import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "../../utils/ContextWrapper";
import { useSelectors } from "../../utils/selectors";

export function useTimer() {
  const { getTimer, isPeekBoard, isPlaying, getWin } = useSelectors();
  const globalServices = useContext(GlobalStateContext);
  const [seconds, setSeconds] = useState<number>(getTimer);
  const [gameTimer, setGameTimer] = useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (seconds >= 0) {
      if (isPlaying) {
        let timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        setGameTimer(timer);
        if (seconds <= 0) {
          globalServices.setErrorCounter(0);
          globalServices.setCorrectCounter(0);
          globalServices.setIsInputDisabled(false);
          globalServices.gameService.send({
            type: "LOSE_GAME",
            newUserTime: globalServices.userTime,
            newUserErrors: globalServices.errorCounter,
            newUserCorrectBlocks: globalServices.correctCounter,
          });
          clearTimeout(gameTimer);
        }
      }
      if (getWin) {
        globalServices.setUserTime(60 - seconds);
        clearTimeout(gameTimer);
      }
      if (isPeekBoard) {
        let peekTimer = setTimeout(
          () => setSeconds(Math.round((seconds - 0.1) * 10) / 10),
          100
        );
        if (seconds === 0) {
          globalServices.gameService.send({
            type: "PEEK_BOARD",
          });
          clearTimeout(peekTimer);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  useEffect(() => {
    setSeconds(getTimer);
  }, [getTimer]);

  return [globalServices.matches, globalServices.errorCounter, seconds];
}
