import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { updateGlobalLeaderboard } from "../../services/globalLeaderboardService";
import { updatePersonalLeaderboard } from "../../services/personalLeaderboardService";
import {
  getPersonalStats,
  updatePersonalStats,
} from "../../services/personalStatsService";
import {
  playCorrectSound,
  playIncorrectSound,
  playWonSound,
} from "../../utils/AudioUtils";
import { formatDate, formatTime, getDateUTC } from "../../utils/DateTimeUtils";
import Leaderboards from "../leaderboard/Leaderboard";
import { keyCodes, alphabet } from "../../constants/game";

const GameUnlimited = ({
  user,
  leaderboards,
  setLeaderboards,
  leaderboardLoading,
  setLeaderboardLoading,
  personalStats,
  setPersonalStats,
}) => {
  const [newestPRRank, setNewestPRRank] = useState(null);
  const [newestGRRank, setNewestGRRank] = useState(null);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [missedChars, setMissedChars] = useState({});
  const [prevMissedIdx, setPrevMissedIdx] = useState({});
  const timerRef = useRef(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(15000);

  const updateLeaderboards = async () => {
    let personalRecord = null;

    for (let i = 0; i < leaderboards.unlimited.personal.length; i++) {
      if (typed.length > leaderboards.unlimited.personal[i].characters) {
        setNewestPRRank(i);
        personalRecord = i;
        break;
      }
    }

    if (
      personalRecord === null &&
      leaderboards.unlimited.personal.length < 100
    ) {
      setNewestPRRank(leaderboards.unlimited.personal.length);
    }

    const formattedDate = formatDate(Date.now());
    const newPersonalLeaderboard = leaderboards.unlimited.personal;

    newPersonalLeaderboard.push({
      user: user._id ? user.username : "Guest",
      characters: typed.length,
      errors: errors,
      accuracy: ((typed.length / (typed.length + errors)) * 100).toFixed(2),
      date: formattedDate,
    });

    newPersonalLeaderboard.sort((a, b) => {
      if (a.characters > b.characters) return -1;
      if (a.characters < b.characters) return 1;
      return 0;
    });

    setLeaderboards((prevLeaderboards) => ({
      ...prevLeaderboards,
      unlimited: {
        personal: newPersonalLeaderboard.slice(0, 100),
        global: prevLeaderboards.unlimited.global,
      },
    }));
    const newGlobalLeaderboard = leaderboards.unlimited.global;

    if (user._id) {
      let globalRecord = null;
      for (let i = 0; i < leaderboards.unlimited.global.length; i++) {
        if (typed.length > leaderboards.unlimited.global[i].characters) {
          setNewestGRRank(i);
          globalRecord = i;
          break;
        }
      }

      if (globalRecord === null && leaderboards.unlimited.global.length < 100) {
        setNewestGRRank(leaderboards.unlimited.global.length);
      }

      newGlobalLeaderboard.push({
        user: user.username,
        characters: typed.length,
        errors: errors,
        accuracy: ((typed.length / (typed.length + errors)) * 100).toFixed(2),
        date: formattedDate,
      });

      newGlobalLeaderboard.sort((a, b) => {
        if (a.characters > b.characters) return -1;
        if (a.characters < b.characters) return 1;
        return 0;
      });

      setLeaderboards((prevLeaderboards) => ({
        ...prevLeaderboards,
        unlimited: {
          personal: prevLeaderboards.unlimited.personal,
          global: newGlobalLeaderboard.slice(0, 100),
        },
      }));
      updateGlobalLeaderboard(
        getDateUTC(new Date()),
        newGlobalLeaderboard,
        "unlimited"
      );
    }

    updatePersonalLeaderboard(
      user._id,
      getDateUTC(new Date()),
      newPersonalLeaderboard,
      "unlimited"
    );
  };

  const updateStats = async () => {
    const personalStatsData = await getPersonalStats(user._id);
    let newPersonalStats = personalStatsData;
    let newMissedChars = newPersonalStats?.unlimited?.missedChars ?? {};

    for (const [key, value] of Object.entries(missedChars)) {
      if (newMissedChars[key]) {
        newMissedChars[key] += missedChars[key];
      } else {
        newMissedChars[key] = missedChars[key];
      }
    }

    newPersonalStats = {
      ...personalStatsData,
      unlimited: {
        gamesPlayed: (newPersonalStats?.unlimited?.gamesPlayed || 0) + 1,
        errors: (newPersonalStats?.unlimited?.errors || 0) + errors,
        cumulativeCharacters:
          (newPersonalStats?.unlimited?.cumulativeCharacters || 0) +
          typed.length,
        bestCharacters: Math.max(
          newPersonalStats?.unlimited?.bestCharacters ||
            Number.NEGATIVE_INFINITY,
          typed.length
        ),
        missedChars: newMissedChars,
      },
    };

    setPersonalStats((prev) => ({
      ...prev,
      unlimited: newPersonalStats.unlimited,
    }));
    updatePersonalStats(user._id, newPersonalStats);
  };

  const startStopwatch = () => {
    setGameFinished(false);
    const startTime = Date.now();
    const initialTime = 15000;
    setElapsedTime(initialTime);
    timerRef.current = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = initialTime - (currentTime - startTime);

      if (remainingTime <= 0) {
        clearInterval(timerRef.current);
        setElapsedTime(0);
        setGameFinished(true);
        playWonSound(user);
      } else {
        setElapsedTime(remainingTime);
      }
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(timerRef.current);
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setElapsedTime(15000);
    setErrors(0);
    setGameFinished(false);
    setNewestPRRank(null);
    setNewestGRRank(null);
    setMissedChars({});
    setPrevMissedIdx({});
    setTyped("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const typedChar = event.key.toLowerCase();
      const nextIndex = typed.length % 26;
      const nextExpectedChar = alphabet[nextIndex];

      // If typed reset key, reset game
      if (keyCodes[event.keyCode] === user.settings.general.quickReset) {
        resetStopwatch();
        return;
      }

      // Typed key when game is finished
      if (gameFinished) {
        return;
      }

      // Typed correct key
      if (typedChar === nextExpectedChar) {
        setTyped((prevTyped) => prevTyped + typedChar);
        playCorrectSound(user);
        return;
      }

      // Incorrect character typed & game in progress
      if (typed.length > 0) {
        playIncorrectSound(user);
        setErrors((prevErrors) => prevErrors + 1);
        setMissedChars((prev) => ({
          ...prev,
          [nextExpectedChar]: (prev[nextExpectedChar] || 0) + 1,
        }));
        setPrevMissedIdx((prev) => ({
          ...prev,
          [nextExpectedChar]: typed.length,
        }));
      }

      // Typed incorrect key & perfection mode is on
      if (user.settings.general.perfectionMode) {
        resetStopwatch();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typed, alphabet, user]);

  useEffect(() => {
    if (typed.length == 1) {
      startStopwatch(true);
    } else if (typed.length > 0 && gameFinished) {
      updateLeaderboards();
      updateStats();
    }
  }, [typed]);

  useEffect(() => {
    if (elapsedTime === 0) {
      setGameFinished(true);
      playWonSound(user);
      stopStopwatch();
    }
  }, [elapsedTime]);

  return (
    <div className="w-full flex flex-col items-center justify-center select-none">
      <div
        className={`${
          !user.settings.general.focus ? "h-[500px]" : "h-[95vh] min-h-[500px]"
        } relative transition-all duration-1000 w-full ease-in-out`}
      >
        {alphabet.split("").map((ch, i) => (
          <div
            key={i}
            className={`${
              missedChars[ch] &&
              typed.length % 26 === i &&
              user.settings.general.showErrors
                ? "border-neutral-300 bg-rose-600 bg-opacity-30 text-neutral-300"
                : missedChars[ch] &&
                  Math.floor(prevMissedIdx[ch] / 26) ==
                    Math.floor(typed.length / 26) &&
                  user.settings.general.showErrors
                ? "border-rose-600 bg-rose-600 bg-opacity-30 text-rose-600"
                : typed.length % 26 > i
                ? "border-rose-600 bg-rose-600 bg-opacity-10 text-rose-600"
                : typed.length % 26 === i
                ? "border-neutral-300 text-neutral-300"
                : "border-neutral-500 text-neutral-500"
            } border-2 w-10 h-10 shadow-md shadow-neutral-900 rounded-2xl flex items-center justify-center font-extrabold absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto`}
            style={{
              transform: `rotate(${
                i * (360 / alphabet.length)
              }deg) translate(200px) rotate(-${
                i * (360 / alphabet.length)
              }deg)`,
            }}
          >
            {ch}
          </div>
        ))}
        <div className="left-0 right-0 bottom-0 top-0 mx-auto my-auto absolute h-fit w-44">
          <div className="flex flex-col items-center relative">
            <div
              className={`transition duraiton-300 text-2xl font-extrabold ${
                typed.length === 0
                  ? "text-neutral-600"
                  : typed.length > 0 && !gameFinished
                  ? "text-neutral-400"
                  : "text-rose-600"
              }`}
            >
              {formatTime(elapsedTime)}
            </div>
            <div
              className={`${
                typed.length === 0 ? "bg-neutral-600" : "bg-neutral-300"
              } bg-neutral-600 h-1 rounded-full w-24 shadow-neutral-900 shadow-sm`}
            >
              <div
                className="h-1 rounded-full bg-rose-600 transition-all duration-300"
                style={{
                  width: `${Math.floor(
                    ((15000 - elapsedTime) / 15000) * 100
                  )}%`,
                }}
              ></div>
            </div>
            <AnimatePresence>
              {gameFinished && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.1,
                  }}
                  className="absolute top-10 right-0 left-0 mx-auto flex flex-col items-center"
                >
                  <div className="text-neutral-300 -mb-2">
                    <span className="">Letters: </span>
                    <span className="font-extrabold">{typed.length}</span>
                  </div>
                  <div className="text-neutral-300 -mb-2">
                    <span className="">Errors: </span>
                    <span className="font-extrabold">{errors}</span>
                  </div>
                  <div className="text-neutral-300">
                    <span className="">Accuracy: </span>
                    <span className="font-extrabold">
                      {((typed.length / (typed.length + errors)) * 100).toFixed(
                        2
                      ) + "%"}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="h-10 absolute left-0 right-0 mx-auto w-fit top-32">
              <AnimatePresence>
                {typed.length > 0 && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.1,
                    }}
                  >
                    <button
                      className="bg-rose-900 bg-opacity-10 shadow-neutral-950 shadow-sm border-2 font-extrabold px-6 rounded-md transition duration-300 hover:border-neutral-50 hover:text-neutral-50 border-rose-600 text-rose-600"
                      onClick={() => {
                        resetStopwatch();
                      }}
                    >
                      Reset
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <Leaderboards
        currentGame={"unlimited"}
        leaderboards={leaderboards}
        newestPRRank={newestPRRank}
        newestGRRank={newestGRRank}
        leaderboardLoading={leaderboardLoading}
      />
    </div>
  );
};

export default GameUnlimited;
