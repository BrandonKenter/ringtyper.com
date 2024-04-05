import { faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

const VolumePopover = ({
  user,
  setUser,
  volumeHovered,
  setVolumeHovered,
  modalOpened,
}) => {
  return (
    <div className="flex">
      <div
        onMouseEnter={() => setVolumeHovered(true)}
        onMouseLeave={() => setVolumeHovered(false)}
        className="flex relative"
      >
        <FontAwesomeIcon
          onClick={() =>
            setUser({
              ...user,
              settings: {
                ...user.settings,
                general: {
                  ...user.settings.general,
                  volume: user.settings.general.volume ? 0 : 50,
                },
              },
            })
          }
          className={`${
            user.settings.general.volume > 0
              ? "text-rose-600"
              : "text-neutral-600"
          } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
          icon={faVolumeHigh}
        />
        <AnimatePresence>
          {volumeHovered && !modalOpened && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.1,
              }}
              className="absolute mx-auto top-6 -left-[74px] w-44 z-40 pt-3"
            >
              <div className="flex items-center justify-center shadow-lg z-40 p-1.5 bg-neutral-900 rounded-xl text-center">
                <input
                  className="cursor-pointer"
                  type="range"
                  min="0"
                  max="100"
                  value={user.settings.general.volume}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      settings: {
                        ...user.settings,
                        general: {
                          ...user.settings.general,
                          volume: e.target.value,
                        },
                      },
                    });
                  }}
                ></input>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VolumePopover;
