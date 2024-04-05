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

const GameShuffle = ({
  user,
  leaderboards,
  setLeaderboards,
  leaderboardLoading,
  setLeaderboardLoading,
  personalStats,
  setPersonalStats,
}) => {
  const [shuffledAlphabet, setShuffledAlphabet] = useState("");
  const [newestPRRank, setNewestPRRank] = useState(null);
  const [newestGRRank, setNewestGRRank] = useState(null);
  const [typed, setTyped] = useState("");
  const [errors, setErrors] = useState(0);
  const [missedChars, setMissedChars] = useState({});
  const timerRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const shuffle = (alphabet) => {
    return alphabet
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");
  };

  const updateLeaderboards = async () => {
    const newTime = elapsedTime;
    let personalRecord = null;

    for (let i = 0; i < leaderboards.shuffle.personal.length; i++) {
      if (newTime < leaderboards.shuffle.personal[i].time) {
        setNewestPRRank(i);
        personalRecord = i;
        break;
      }
    }

    if (personalRecord === null && leaderboards.shuffle.personal.length < 100) {
      setNewestPRRank(leaderboards.shuffle.personal.length);
    }

    const formattedDate = formatDate(Date.now());
    const newPersonalLeaderboard = leaderboards.shuffle.personal;

    newPersonalLeaderboard.push({
      user: user._id ? user.username : "Guest",
      time: newTime,
      errors: errors,
      accuracy: ((26 / (26 + errors)) * 100).toFixed(2),
      date: formattedDate,
    });

    newPersonalLeaderboard.sort((a, b) => {
      if (a.time < b.time) return -1;
      if (a.time > b.time) return 1;
      return 0;
    });

    setLeaderboards((prevLeaderboards) => ({
      ...prevLeaderboards,
      shuffle: {
        personal: newPersonalLeaderboard.slice(0, 100),
        global: prevLeaderboards.shuffle.global,
      },
    }));

    if (user._id) {
      let globalRecord = null;

      for (let i = 0; i < leaderboards.shuffle.global.length; i++) {
        if (newTime < leaderboards.shuffle.global[i].time) {
          setNewestGRRank(i);
          globalRecord = i;
          break;
        }
      }

      if (globalRecord === null && leaderboards.shuffle.global.length < 100) {
        setNewestGRRank(leaderboards.shuffle.global.length);
      }

      const newGlobalLeaderboard = leaderboards.shuffle.global;
      newGlobalLeaderboard.push({
        user: user.username,
        time: newTime,
        errors: errors,
        accuracy: ((26 / (26 + errors)) * 100).toFixed(2),
        date: formattedDate,
      });

      newGlobalLeaderboard.sort((a, b) => {
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });

      setLeaderboards((prevLeaderboards) => ({
        ...prevLeaderboards,
        shuffle: {
          personal: prevLeaderboards.shuffle.personal,
          global: newGlobalLeaderboard.slice(0, 100),
        },
      }));

      updateGlobalLeaderboard(
        getDateUTC(new Date()),
        newGlobalLeaderboard,
        "shuffle"
      );
    }

    updatePersonalLeaderboard(
      user._id,
      getDateUTC(new Date()),
      newPersonalLeaderboard,
      "shuffle"
    );
  };

  const updateStats = async () => {
    const personalStatsData = await getPersonalStats(user._id);
    let newPersonalStats = personalStatsData;
    let newMissedChars = newPersonalStats?.shuffle?.missedChars ?? {};

    for (const [key, value] of Object.entries(missedChars)) {
      if (newMissedChars[key]) {
        newMissedChars[key] += missedChars[key];
      } else {
        newMissedChars[key] = missedChars[key];
      }
    }

    newPersonalStats = {
      ...personalStatsData,
      shuffle: {
        gamesPlayed: (newPersonalStats?.shuffle?.gamesPlayed || 0) + 1,
        errors: (newPersonalStats?.shuffle?.errors || 0) + errors,
        cumulativeTime:
          (newPersonalStats?.shuffle?.cumulativeTime || 0) + elapsedTime,
        bestTime: Math.min(
          newPersonalStats?.shuffle?.bestTime || Number.POSITIVE_INFINITY,
          elapsedTime
        ),
        missedChars: newMissedChars,
      },
    };

    setPersonalStats((prev) => ({
      ...prev,
      shuffle: newPersonalStats.shuffle,
    }));
    updatePersonalStats(user._id, newPersonalStats);
  };

  const startStopwatch = () => {
    const startTime = Date.now() - elapsedTime;
    timerRef.current = setInterval(() => {
      const currentTime = Date.now();
      setElapsedTime(currentTime - startTime);
    }, 10);
  };

  const stopStopwatch = () => {
    clearInterval(timerRef.current);
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setElapsedTime(0);
    setErrors(0);
    setNewestPRRank(null);
    setNewestGRRank(null);
    setMissedChars({});
    setTyped("");
  };

  useEffect(() => {
    if (
      user.settings.games.shuffle.maximumTime !== 0 &&
      user.settings.games.shuffle.maximumTime * 1000 <= elapsedTime
    ) {
      resetStopwatch();
    }
  }, [elapsedTime]);

  useEffect(() => {
    setShuffledAlphabet(shuffle(alphabet));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const typedChar = event.key.toLowerCase();
      const nextExpectedChar = shuffledAlphabet[typed.length];

      // Typed reset key
      if (keyCodes[event.keyCode] === user.settings.general.quickReset) {
        resetStopwatch();
        return;
      }

      // Typed key when game is finished
      if (typed.length > 25) {
        return;
      }

      // Typed correct key
      if (typedChar === nextExpectedChar) {
        setTyped((prevTyped) => prevTyped + typedChar);
        playCorrectSound(user);
        if (typed.length === 25) {
          playWonSound(user);
        }
        return;
      }

      // Typed incorrect key & game is in progress
      if (typed.length > 0 && typed.length < 26) {
        playIncorrectSound(user);
        setErrors((prevErrors) => prevErrors + 1);
        setMissedChars((prev) => ({
          ...prev,
          [nextExpectedChar]: (prev[nextExpectedChar] || 0) + 1,
        }));
      }

      // Typed incorrect key & perfection mode is on
      if (user.settings.general.perfectionMode) {
        resetStopwatch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [typed, shuffledAlphabet, user]);

  useEffect(() => {
    if (typed.length == 1) {
      startStopwatch();
    } else if (typed.length === 26) {
      updateLeaderboards();
      updateStats();
      stopStopwatch();
    }
  }, [typed]);

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
              typed.includes(ch)
                ? "border-rose-600 bg-rose-600 bg-opacity-10 text-neutral-300"
                : shuffledAlphabet[typed.length] === ch
                ? "border-neutral-300 text-neutral-100"
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
                typed.length == 0
                  ? "text-neutral-600"
                  : typed.length < 26
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
                  width: `${Math.floor((typed.length / 26) * 100)}%`,
                }}
              ></div>
            </div>
            <AnimatePresence>
              {typed.length === 26 && (
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
                  <div className="text-neutral-500 -mb-2">
                    <span className="">Errors: </span>
                    <span className="font-extrabold">{errors}</span>
                  </div>
                  <div className="text-neutral-500">
                    <span className="">Accuracy: </span>
                    <span className="font-extrabold">
                      {((26 / (26 + errors)) * 100).toFixed(2) + "%"}
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
                      className="bg-rose-900 bg-opacity-10 border-2 shadow-neutral-950 shadow-sm font-extrabold px-6 rounded-md transition duration-300 hover:border-neutral-50 hover:text-neutral-50 border-rose-600 text-rose-600"
                      onClick={() => {
                        resetStopwatch();
                        setTyped("");
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
        currentGame={"shuffle"}
        leaderboards={leaderboards}
        newestPRRank={newestPRRank}
        newestGRRank={newestGRRank}
        leaderboardLoading={leaderboardLoading}
      />
    </div>
  );
};

export default GameShuffle;
