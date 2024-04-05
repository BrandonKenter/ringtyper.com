import { faInfo, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import UtilityPopover from "../popovers/UtilityPopover";

const InformationModal = ({
  informationModalOpened,
  setInformationModalOpened,
  informationHovered,
  setInformationHovered,
  modalOpened,
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, setInformationModalOpened);

  return (
    <div ref={modalRef} className="flex">
      <div className="flex relative">
        <FontAwesomeIcon
          onMouseEnter={() => setInformationHovered(true)}
          onMouseLeave={() => setInformationHovered(false)}
          onClick={() => setInformationModalOpened((prev) => !prev)}
          className="text-neutral-600 w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1"
          icon={faInfo}
        />
        <UtilityPopover
          popoverDescription={"Information"}
          iconHovered={informationHovered}
          modalOpened={modalOpened}
        />
      </div>
      <AnimatePresence>
        {informationModalOpened && (
          <motion.div
            layout
            initial={{ y: -15, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -15, opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.05,
            }}
            className="z-50 flex flex-col p-5 items-center bg-neutral-900 max-w-[600px]
        w-full h-fit absolute top-10 left-0 right-0 mx-auto rounded-md shadow-xl"
          >
            <FontAwesomeIcon
              onClick={() => setInformationModalOpened(false)}
              className="top-2 cursor-pointer transition duration-300 hover:text-neutral-50 hover:border-neutral-50 right-2 border aboslute border-rose-600 p-0.5 absolute rounded-md w-4 h-4 text-rose-600"
              icon={faXmark}
            />
            <div className="flex items-center mr-auto gap-1 mb-3 text-rose-600">
              <FontAwesomeIcon className="w-5 h-5" icon={faInfo} />
              <span className="font-extrabold text-lg">Information</span>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-neutral-300 font-semibold">About</span>
              <div className="flex w-full">
                <div className="flex flex-col">
                  <div>
                    <span className="text-neutral-500">Welcome to </span>
                    <span className="font-extrabold text-rose-600">Ring</span>
                    <span className="text-neutral-500">Typer, </span>
                    <span className="text-neutral-500">
                      a website where you can play various typing games related
                      to the alphabet, track your progress and see how your
                      times stack up against others around the world!
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-neutral-300 font-semibold">
                Leaderboards
              </span>
              <div className="flex w-full">
                <div className="flex flex-col">
                  <div>
                    <span className="text-neutral-500">
                      Each typing game has its own leaderboard. The leaderboards
                      are reset everyday at{" "}
                      <span className="text-neutral-400 font-semibold">
                        00:00 UTC
                      </span>
                      .
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-neutral-300 font-semibold">Contact</span>
              <div className="flex w-full">
                <div className="flex flex-col">
                  <div>
                    <span className="text-neutral-500">
                      To report a bug, request a feature, provide any feedback
                      or get help, please feel free to email us at{" "}
                      <NavLink
                        to="contact"
                        className="text-rose-600 hover:text-neutral-50 transition duration-300 cursor-pointer"
                      >
                        contact@ringtyper.com
                      </NavLink>
                    </span>
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

export default InformationModal;
