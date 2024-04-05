import {
  faChartSimple,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "chart.js/auto";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import UtilityPopover from "../../popovers/UtilityPopover";
import TabContent from "./TabContent";

const StatsModal = ({
  statsModalOpened,
  setStatsModalOpened,
  statsHovered,
  setStatsHovered,
  modalOpened,
  user,
  personalStats,
}) => {
  Chart.defaults.borderColor = "#171717";

  const [gameTab, setGameTab] = useState("Classic");
  const tabs = ["Classic", "Reverse", "Shuffle", "Unlimited"];
  const modalRef = useRef(null);

  useOutsideClick(modalRef, setStatsModalOpened);

  return (
    <div ref={modalRef} className="flex">
      <div className="flex relative">
        <FontAwesomeIcon
          onMouseEnter={() => setStatsHovered(true)}
          onMouseLeave={() => setStatsHovered(false)}
          onClick={() => setStatsModalOpened((prev) => !prev)}
          className="text-neutral-600 w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1"
          icon={faChartSimple}
        />
        <UtilityPopover
          popoverDescription={"Statistics"}
          iconHovered={statsHovered}
          modalOpened={modalOpened}
        />
      </div>
      <AnimatePresence>
        {statsModalOpened && (
          <motion.div
            layout
            initial={{ y: -15, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -15, opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.05,
            }}
            className="z-50 flex flex-col p-5 items-center bg-neutral-900 max-w-[600px]
      w-full absolute top-10 left-0 right-0 mx-auto rounded-md shadow-xl"
          >
            <FontAwesomeIcon
              onClick={() => setStatsModalOpened(false)}
              className="top-2 cursor-pointer transition duration-300 hover:text-neutral-50 hover:border-neutral-50 right-2 border aboslute border-rose-600 p-0.5 absolute rounded-md w-4 h-4 text-rose-600"
              icon={faXmark}
            />
            <div className="flex items-center mr-auto gap-1 mb-3 text-rose-600">
              <FontAwesomeIcon className="w-5 h-5" icon={faChartSimple} />
              <span className="font-extrabold text-lg">Statistics</span>
            </div>
            {user._id ? (
              <div>
                <div className="flex justify-center gap-1 text-neutral-300">
                  {tabs.map((tab, i) => (
                    <button
                      key={i}
                      onClick={() => setGameTab(tab)}
                      className={`${
                        gameTab === tab
                          ? "bg-neutral-700"
                          : "hover:bg-neutral-700 hover:bg-opacity-60"
                      } py-1 px-2 font-semibold rounded-md transition duration-300`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {gameTab === "Classic" && (
                  <TabContent personalStats={personalStats} game={"classic"} />
                )}
                {gameTab === "Reverse" && (
                  <TabContent personalStats={personalStats} game={"reverse"} />
                )}
                {gameTab === "Shuffle" && (
                  <TabContent personalStats={personalStats} game={"shuffle"} />
                )}
                {gameTab === "Unlimited" && (
                  <TabContent
                    personalStats={personalStats}
                    game={"unlimited"}
                  />
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-neutral-300">
                  Sign in to view your statistics.
                </span>
                <NavLink
                  to={"/login"}
                  className="mt-5 cursor-pointer gap-3 shadow-neutral-950 shadow-sm hover:text-neutral-50 transition duration-300 border-rose-600 border-2 hover:border-neutral-50 font-extrabold text-rose-600 px-6 bg-rose-900 bg-opacity-10 rounded-md flex items-center justify-center"
                >
                  Sign in
                  <FontAwesomeIcon icon={faRightToBracket} />
                </NavLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatsModal;
