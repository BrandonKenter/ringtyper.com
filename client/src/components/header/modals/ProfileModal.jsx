import {
  faRightToBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { signOutUser } from "../../../services/userService";
import { formatDate } from "../../../utils/DateTimeUtils";
import UtilityPopover from "../popovers/UtilityPopover";

const ProfileModal = ({
  profileModalOpened,
  setProfileModalOpened,
  profileHovered,
  setProfileHovered,
  modalOpened,
  user,
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, setProfileModalOpened);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSignOut = async () => {
    try {
      const signOutData = await signOutUser();
      localStorage.removeItem("token");
      refreshPage();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div ref={modalRef} className="flex">
      <div className="flex relative">
        <FontAwesomeIcon
          onMouseEnter={() => setProfileHovered(true)}
          onMouseLeave={() => setProfileHovered(false)}
          onClick={() => setProfileModalOpened((prev) => !prev)}
          className="text-neutral-600 w-5 hover:text-neutral-300 transition duration-300 cursor-pointer p-1"
          icon={faUser}
        />
        <UtilityPopover
          popoverDescription={"Profile"}
          iconHovered={profileHovered}
          modalOpened={modalOpened}
        />
      </div>
      <AnimatePresence>
        {profileModalOpened && (
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
              onClick={() => setProfileModalOpened(false)}
              className="top-2 cursor-pointer transition duration-300 hover:text-neutral-50 hover:border-neutral-50 right-2 border aboslute border-rose-600 p-0.5 absolute rounded-md w-4 h-4 text-rose-600"
              icon={faXmark}
            />
            <div className="flex items-center mr-auto gap-1 mb-3 text-rose-600">
              <FontAwesomeIcon className="w-5 h-5" icon={faUser} />
              <span className="font-extrabold text-lg">Profile</span>
            </div>
            {user._id ? (
              <div className="w-full flex items-center flex-col">
                <div className="flex flex-col items-start mr-auto">
                  <div className="flex items-end gap-1">
                    <span className="text-neutral-400 ">Username</span>
                    <span className="text-neutral-200 font-bold">
                      {user.username}
                    </span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-neutral-400">Email</span>
                    <span className="text-neutral-200 font-bold">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-neutral-400">Joined</span>
                    <span className="text-neutral-200 font-bold">
                      {formatDate(user.joined)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="shadow-sm shadow-neutral-950 mt-5 cursor-pointer gap-3 hover:text-neutral-50 transition duration-300 border-rose-600 border-2 hover:border-neutral-50 font-extrabold text-rose-600 px-6 bg-rose-900 bg-opacity-10 rounded-md flex items-center justify-center"
                >
                  Sign out
                  <FontAwesomeIcon icon={faRightToBracket} />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-neutral-300">
                  Sign in to view your profile.
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

export default ProfileModal;
