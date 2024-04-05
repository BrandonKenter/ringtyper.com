import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UtilityPopover from "../popovers/UtilityPopover";

const Volume = ({
  user,
  setUser,
  focusHovered,
  setFocusHovered,
  modalOpened,
  handleFocusClick,
}) => {
  return (
    <div className="flex">
      <div
        onMouseEnter={() => setFocusHovered(true)}
        onMouseLeave={() => setFocusHovered(false)}
        className="flex relative"
      >
        <FontAwesomeIcon
          onClick={() => {
            handleFocusClick();
            setUser({
              ...user,
              settings: {
                ...user.settings,
                general: {
                  ...user.settings.general,
                  focus: !user.settings.general.focus,
                },
              },
            });
          }}
          className={`${
            user.settings.general.focus === true
              ? "text-rose-600"
              : "text-neutral-600"
          } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
          icon={faMugHot}
        />
        <UtilityPopover
          popoverDescription={"Focus"}
          iconHovered={focusHovered}
          modalOpened={modalOpened}
        />
      </div>
    </div>
  );
};

export default Volume;
