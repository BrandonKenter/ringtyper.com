import { faGear, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import UtilityPopover from "../popovers/UtilityPopover";

const SettingsModal = ({
  settingsModalOpened,
  setSettingsModalOpened,
  settingsHovered,
  setSettingsHovered,
  modalOpened,
  user,
  setUser,
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, setSettingsModalOpened);

  const handleIncrement = (game) => {
    const newValue = parseInt(user.settings.games[game].maximumTime || "0") + 1;
    if (newValue <= 999) {
      setUser((prevUser) => ({
        ...prevUser,
        settings: {
          ...prevUser.settings,
          games: {
            ...prevUser.settings.games,
            [game]: {
              ...prevUser.settings.games[game],
              maximumTime: newValue,
            },
          },
        },
      }));
    }
  };

  const handleDecrement = (game) => {
    const newValue = parseInt(user.settings.games[game].maximumTime || "0") - 1;
    if (newValue >= 0) {
      setUser((prevUser) => ({
        ...prevUser,
        settings: {
          ...prevUser.settings,
          games: {
            ...prevUser.settings.games,
            [game]: {
              ...prevUser.settings.games[game],
              maximumTime: newValue,
            },
          },
        },
      }));
    }
  };

  return (
    <div ref={modalRef} className="flex">
      <div className="flex relative">
        <FontAwesomeIcon
          onMouseEnter={() => setSettingsHovered(true)}
          onMouseLeave={() => setSettingsHovered(false)}
          onClick={() => setSettingsModalOpened((prev) => !prev)}
          className="text-neutral-600 w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1"
          icon={faGear}
        />
        <UtilityPopover
          popoverDescription={"Settings"}
          iconHovered={settingsHovered}
          modalOpened={modalOpened}
        />
      </div>
      <AnimatePresence>
        {settingsModalOpened && (
          <motion.div
            layout
            initial={{ y: -15, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 0, opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.1,
            }}
            className="z-50 flex flex-col p-5 items-center bg-neutral-900 max-w-[600px]
        w-full absolute top-10 left-0 right-0 mx-auto rounded-md shadow-xl"
          >
            <FontAwesomeIcon
              onClick={() => setSettingsModalOpened(false)}
              className="top-2 cursor-pointer transition duration-300 hover:text-neutral-50 hover:border-neutral-50 right-2 border aboslute border-rose-600 p-0.5 absolute rounded-md w-4 h-4 text-rose-600"
              icon={faXmark}
            />
            <div className="flex items-center mr-auto gap-1 mb-3 text-rose-600">
              <FontAwesomeIcon className="w-5 h-5" icon={faGear} />
              <span className="font-extrabold text-lg">Settings</span>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex w-full">
                <div className="flex flex-col max-w-64">
                  <span className="text-neutral-300 font-semibold">
                    Quick Reset
                  </span>
                  <span className="text-neutral-500">
                    The key that resets the game you are playing.
                  </span>
                </div>
                <div className="flex items-center ml-auto gap-1">
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            quickReset: "enter",
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.quickReset === "enter"
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    Enter
                  </button>
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            quickReset: "tab",
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.quickReset === "tab"
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    Tab
                  </button>
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            quickReset: "esc",
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.quickReset === "esc"
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    Esc
                  </button>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col max-w-64">
                  <span className="text-neutral-300 font-semibold">
                    Highlight Errors
                  </span>
                  <span className="text-neutral-500">
                    Misstyped characters will be highlighted.
                  </span>
                </div>
                <div className="flex items-center ml-auto gap-1">
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            showErrors: true,
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.showErrors === true
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    On
                  </button>
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            showErrors: false,
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.showErrors === false
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    Off
                  </button>
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex flex-col max-w-64">
                  <span className="text-neutral-300 font-semibold">
                    Perfection Mode
                  </span>
                  <span className="text-neutral-500">
                    Game automatically resets when an incorrect key is pressed.
                  </span>
                </div>
                <div className="flex items-center ml-auto gap-1">
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            perfectionMode: true,
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.perfectionMode === true
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    On
                  </button>
                  <button
                    onClick={() =>
                      setUser({
                        ...user,
                        settings: {
                          ...user.settings,
                          general: {
                            ...user.settings.general,
                            perfectionMode: false,
                          },
                        },
                      })
                    }
                    className={`${
                      user.settings.general.perfectionMode === false
                        ? "border-rose-600 text-rose-600"
                        : "border-neutral-600 text-neutral-600"
                    } text-sm cursor-pointer h-fit hover:text-neutral-50 transition duration-300 border-2 hover:border-neutral-50 font-extrabold px-3 rounded-md`}
                  >
                    Off
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <div className="flex w-full items-center">
                <div className="flex flex-col max-w-64">
                  <span className="text-neutral-300 font-semibold">
                    Maximum Time
                  </span>
                  <span className="text-neutral-500">
                    Game automatically resets when a number of seconds has
                    elapsed.
                  </span>
                </div>
                <div className="flex gap-1 ml-auto">
                  <div className="flex flex-col items-center">
                    <span className="text-neutral-300">Classic</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement("classic")}
                        className={`${
                          user.settings.games.classic.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-l-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={user.settings.games.classic.maximumTime}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^\d*$/.test(inputValue) &&
                            inputValue.length <= 3
                          ) {
                            setUser((prevUser) => ({
                              ...prevUser,
                              settings: {
                                ...user.settings,
                                games: {
                                  ...prevUser.settings.games,
                                  classic: {
                                    ...prevUser.settings.games.classic,
                                    maximumTime: inputValue,
                                  },
                                },
                              },
                            }));
                          }
                        }}
                        className={`${
                          user.settings.games.classic.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } w-11 h-7 py-1 px-2 border-2 border-x-0 text-center transition duration-300 focus:outline-none bg-neutral-900`}
                      />
                      <button
                        onClick={() => handleIncrement("classic")}
                        className={`${
                          user.settings.games.classic.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-r-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-neutral-300">Reverse</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement("reverse")}
                        className={`${
                          user.settings.games.reverse.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-l-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={user.settings.games.reverse.maximumTime}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^\d*$/.test(inputValue) &&
                            inputValue.length <= 3
                          ) {
                            setUser((prevUser) => ({
                              ...prevUser,
                              settings: {
                                ...user.settings,
                                games: {
                                  ...prevUser.settings.games,
                                  reverse: {
                                    ...prevUser.settings.games.reverse,
                                    maximumTime: inputValue,
                                  },
                                },
                              },
                            }));
                          }
                        }}
                        className={`${
                          user.settings.games.reverse.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } w-11 h-7 py-1 px-2 border-2 border-x-0 text-center transition duration-300 focus:outline-none bg-neutral-900`}
                      />
                      <button
                        onClick={() => handleIncrement("reverse")}
                        className={`${
                          user.settings.games.reverse.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-r-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-neutral-300">Shuffle</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement("shuffle")}
                        className={`${
                          user.settings.games.shuffle.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-l-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={user.settings.games.shuffle.maximumTime}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (
                            /^\d*$/.test(inputValue) &&
                            inputValue.length <= 3
                          ) {
                            setUser((prevUser) => ({
                              ...prevUser,
                              settings: {
                                ...user.settings,
                                games: {
                                  ...prevUser.settings.games,
                                  shuffle: {
                                    ...prevUser.settings.games.shuffle,
                                    maximumTime: inputValue,
                                  },
                                },
                              },
                            }));
                          }
                        }}
                        className={`${
                          user.settings.games.shuffle.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } w-11 h-7 py-1 px-2 border-2 border-x-0 text-center transition duration-300 focus:outline-none bg-neutral-900`}
                      />
                      <button
                        onClick={() => handleIncrement("shuffle")}
                        className={`${
                          user.settings.games.shuffle.maximumTime === 0
                            ? "text-neutral-600 border-neutral-600"
                            : "text-rose-600 border-rose-600"
                        } p-1 hover:text-neutral-50 hover:border-neutral-50 transition duration-300 border-2 rounded-r-md cursor-pointer h-7 flex items-center justify-center`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsModal;
