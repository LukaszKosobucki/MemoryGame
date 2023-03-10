import { useSelector } from "@xstate/react";
import { useContext, useEffect, useState } from "react";
import { TBoard } from "../components/game/GameBoard";
import { GlobalStateContext } from "./ContextWrapper";

export const endGame = (state: any) => {
  return state.matches("endGame");
};
export const level = (state: any) => {
  return state.context.level;
};
export const timer = (state: any) => {
  return state.context.time;
};
export const size = (state: any) => {
  return state.context.size;
};
export const playing = (state: any) => {
  return state.matches("playing");
};
export const peekBoard = (state: any) => {
  return state.matches("peekBoard");
};
const countdown = (state: any) => {
  return state.matches("countdown");
};
const debuglog = (state: any) => {
  return state;
};
const board = (state: any) => {
  return state.context.board;
};
const emptyBoard = (state: any) => {
  return state.context.emptyBoard;
};
const win = (state: any) => {
  return state.context.win;
};
const userTime = (state: any) => {
  return state.context.userTime;
};
const userErrors = (state: any) => {
  return state.context.userErrors;
};
const userCorrectBlocks = (state: any) => {
  return state.context.userCorrectBlocks;
};

export const useSelectors = () => {
  const globalServices = useContext(GlobalStateContext);

  const hasLost = useSelector(globalServices.gameService, endGame);
  const getLevel = useSelector(globalServices.gameService, level);
  const getTimer = useSelector(globalServices.gameService, timer);
  const isPlaying = useSelector(globalServices.gameService, playing);
  const isPeekBoard = useSelector(globalServices.gameService, peekBoard);
  const isCounting = useSelector(globalServices.gameService, countdown);
  const getState = useSelector(globalServices.gameService, debuglog);
  const getSize = useSelector(globalServices.gameService, size);
  const getBoard = useSelector(globalServices.gameService, board);
  const getEmptyBoard = useSelector(globalServices.gameService, emptyBoard);
  const getWin = useSelector(globalServices.gameService, win);
  const getUserTime = useSelector(globalServices.gameService, userTime);
  const getUserErrors = useSelector(globalServices.gameService, userErrors);
  const getUserCorrectBlocks = useSelector(
    globalServices.gameService,
    userCorrectBlocks
  );
  const [seconds, setSeconds] = useState<number>(getTimer);
  function useTimer() {
    const globalServices = useContext(GlobalStateContext);
    const { getTimer, isPeekBoard, isPlaying } = useSelectors();

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
              newUserTime: 60 - seconds,
              newUserErrors: globalServices.errorCounter,
              newUserCorrectBlocks: globalServices.correctCounter,
            });
            clearTimeout(gameTimer);
          }
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

  useEffect(() => {
    if (globalServices.errorCounter === 3) {
      globalServices.gameService.send({
        type: "LOSE_GAME",
        newUserTime: 60 - seconds,
        newUserErrors: globalServices.errorCounter,
        newUserCorrectBlocks: globalServices.correctCounter,
      });
      globalServices.setErrorCounter(0);
      globalServices.setCorrectCounter(0);
      globalServices.setIsInputDisabled(false);
    }
    if (
      getBoard.filter((obj: TBoard) => obj.selected === true).length ===
      getEmptyBoard.filter((obj: TBoard) => obj.selected === true).length
    ) {
      globalServices.gameService.send({
        type: "WIN_LEVEL",
        newUserTime: 60 - seconds,
        newUserErrors: globalServices.errorCounter,
        newUserCorrectBlocks: globalServices.correctCounter,
      });
      globalServices.setErrorCounter(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalServices.errorCounter, globalServices.correctCounter]);

  return {
    hasLost: hasLost,
    getLevel: getLevel,
    getTimer: getTimer,
    isPlaying: isPlaying,
    isPeekBoard: isPeekBoard,
    isCounting: isCounting,
    getState: getState,
    getSize: getSize,
    getBoard: getBoard,
    getWin: getWin,
    getEmptyBoard: getEmptyBoard,
    getUserTime: getUserTime,
    getUserErrors: getUserErrors,
    getUserCorrectBlocks: getUserCorrectBlocks,
    useTimer: useTimer,
  };
};
