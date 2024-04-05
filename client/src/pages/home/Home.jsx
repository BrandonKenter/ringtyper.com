import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import GameClassic from "../../components/games/GameClassic";
import GameReverse from "../../components/games/GameReverse";
import GameShuffle from "../../components/games/GameShuffle";
import GameUnlimited from "../../components/games/GameUnlimited";
import Header from "../../components/header/Header";
import initialUserState from "../../constants/initialUserState";
import { getGlobalLeaderboard } from "../../services/globalLeaderboardService";
import { getPersonalLeaderboard } from "../../services/personalLeaderboardService";
import { getPersonalStats } from "../../services/personalStatsService";
import { getUser, updateUser } from "../../services/userService";

const Home = () => {
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);
  const [gameTab, setGameTab] = useState("Alphabet");
  const [user, setUser] = useState(initialUserState.user);
  const [leaderboards, setLeaderboards] = useState(
    initialUserState.leaderboards
  );
  const [personalStats, setPersonalStats] = useState(
    initialUserState.personalStats
  );

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userData = await getUser(token);

        if (userData._id) {
          setUser(userData);
          console.log("User logged in.");
        } else {
          console.log("User not logged in.");
        }

        const getLeaderboardData = async () => {
          if (userData._id) {
            const personalLeaderboardData = await getPersonalLeaderboard(
              userData._id
            );
            const globalLeaderboardData = await getGlobalLeaderboard();

            setLeaderboards((prevLeaderboards) => ({
              ...prevLeaderboards,
              reverse: {
                personal: personalLeaderboardData
                  ? personalLeaderboardData.reverse
                  : [],
                global: globalLeaderboardData
                  ? globalLeaderboardData.reverse
                  : [],
              },
              classic: {
                personal: personalLeaderboardData
                  ? personalLeaderboardData.classic
                  : [],
                global: globalLeaderboardData
                  ? globalLeaderboardData.classic
                  : [],
              },
              shuffle: {
                personal: personalLeaderboardData
                  ? personalLeaderboardData.shuffle
                  : [],
                global: globalLeaderboardData
                  ? globalLeaderboardData.shuffle
                  : [],
              },
              unlimited: {
                personal: personalLeaderboardData
                  ? personalLeaderboardData.unlimited
                  : [],
                global: globalLeaderboardData
                  ? globalLeaderboardData.unlimited
                  : [],
              },
            }));
          } else {
            const globalLeaderboardData = await getGlobalLeaderboard();

            setLeaderboards((prevLeaderboards) => ({
              reverse: {
                personal: prevLeaderboards.reverse.personal,
                global: globalLeaderboardData
                  ? globalLeaderboardData.reverse
                  : [],
              },
              classic: {
                personal: prevLeaderboards.classic.personal,
                global: globalLeaderboardData
                  ? globalLeaderboardData.classic
                  : [],
              },
              shuffle: {
                personal: prevLeaderboards.shuffle.personal,
                global: globalLeaderboardData
                  ? globalLeaderboardData.shuffle
                  : [],
              },
              unlimited: {
                personal: prevLeaderboards.unlimited.personal,
                global: globalLeaderboardData
                  ? globalLeaderboardData.unlimited
                  : [],
              },
            }));
          }

          setLeaderboardLoading(false);
        };

        getLeaderboardData();
      } catch (err) {
        console.error(err);
      }

      setLoadingMessage("Getting global data...");
      await new Promise((resolve) => setTimeout(resolve, 760));
      setLoadingMessage("Getting user data...");
      await new Promise((resolve) => setTimeout(resolve, 600));

      setDataLoaded(true);
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (user._id) {
      console.log("Updating user settings...");
      updateUser(user);
    }

    const getPersonalData = async () => {
      const personalStatsData = await getPersonalStats(user._id);
      setPersonalStats((prev) => ({ ...prev, ...personalStatsData }));
    };

    getPersonalData();
  }, [user]);

  return !dataLoaded ? (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800 px-10 relative">
      <div className="flex flex-col items-center gap-1">
        <span className="text-neutral-300">
          {loadingMessage ? loadingMessage : "Getting global data..."}
        </span>
        <div
          className={`${"bg-neutral-600"} bg-neutral-600 h-2 rounded-full w-52`}
        >
          <div
            className="h-2 rounded-full bg-rose-600 transition-all duration-700 ease-in-out"
            style={{
              width: `${
                loadingMessage === null
                  ? 0
                  : loadingMessage === "Getting global data..."
                  ? 32
                  : 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  ) : (
    <motion.div
      className="min-h-screen bg-neutral-800 px-10 relative"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
      }}
    >
      <div>
        <Header
          user={user}
          setUser={setUser}
          gameTab={gameTab}
          setGameTab={setGameTab}
          personalStats={personalStats}
        />
      </div>
      {gameTab === "Alphabet" && (
        <GameClassic
          user={user}
          leaderboards={leaderboards}
          setLeaderboards={setLeaderboards}
          leaderboardLoading={leaderboardLoading}
          setLeaderboardLoading={setLeaderboardLoading}
          personalStats={personalStats}
          setPersonalStats={setPersonalStats}
        />
      )}
      {gameTab === "ReverseAlphabet" && (
        <GameReverse
          user={user}
          leaderboards={leaderboards}
          setLeaderboards={setLeaderboards}
          leaderboardLoading={leaderboardLoading}
          setLeaderboardLoading={setLeaderboardLoading}
          personalStats={personalStats}
          setPersonalStats={setPersonalStats}
        />
      )}
      {gameTab === "UnlimitedTimed" && (
        <GameUnlimited
          user={user}
          leaderboards={leaderboards}
          setLeaderboards={setLeaderboards}
          leaderboardLoading={leaderboardLoading}
          setLeaderboardLoading={setLeaderboardLoading}
          personalStats={personalStats}
          setPersonalStats={setPersonalStats}
        />
      )}
      {gameTab === "Shuffle" && (
        <GameShuffle
          user={user}
          leaderboards={leaderboards}
          setLeaderboards={setLeaderboards}
          leaderboardLoading={leaderboardLoading}
          setLeaderboardLoading={setLeaderboardLoading}
          personalStats={personalStats}
          setPersonalStats={setPersonalStats}
        />
      )}
    </motion.div>
  );
};

export default Home;
