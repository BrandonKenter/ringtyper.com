import {
  faBarsStaggered,
  faBell,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import UtilityPopover from "../popovers/UtilityPopover";

const NotificationsModal = ({
  notificationsModalOpened,
  setNotificationsModalOpened,
  notificationsHovered,
  setNotificationsHovered,
  modalOpened,
  user,
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, setNotificationsModalOpened);

  return (
    <div ref={modalRef} className="flex">
      <div className="flex relative">
        <FontAwesomeIcon
          onMouseEnter={() => setNotificationsHovered(true)}
          onMouseLeave={() => setNotificationsHovered(false)}
          onClick={() => setNotificationsModalOpened((prev) => !prev)}
          className="text-neutral-600 w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1"
          icon={faBell}
        />
        <UtilityPopover
          popoverDescription={"Notifications"}
          iconHovered={notificationsHovered}
          modalOpened={modalOpened}
        />
      </div>
      <AnimatePresence>
        {notificationsModalOpened && (
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
              onClick={() => setNotificationsModalOpened(false)}
              className="top-2 cursor-pointer transition duration-300 hover:text-neutral-50 hover:border-neutral-50 right-2 border aboslute border-rose-600 p-0.5 absolute rounded-md w-4 h-4 text-rose-600"
              icon={faXmark}
            />
            <div className="flex items-center mr-auto gap-1 mb-3 text-rose-600">
              <FontAwesomeIcon className="w-5 h-5" icon={faBell} />
              <span className="font-extrabold text-lg">Notifications</span>
            </div>
            {user._id ? (
              <div className="flex items-center gap-2 bg-neutral-800 px-6 py-1 rounded-lg">
                <FontAwesomeIcon
                  className="text-neutral-500"
                  icon={faBarsStaggered}
                />
                <span className="text-neutral-500 font-extrabold">
                  No Notifications
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-neutral-300">
                  Sign in to view your notifications.
                </span>
                <NavLink
                  to={"/login"}
                  className="mt-5 cursor-pointer shadow-neutral-950 shadow-sm gap-3 hover:text-neutral-50 transition duration-300 border-rose-600 border-2 hover:border-neutral-50 font-extrabold text-rose-600 px-6 bg-rose-900 bg-opacity-10 rounded-md flex items-center justify-center"
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

export default NotificationsModal;
