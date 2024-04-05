import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GamePopover from "../popovers/GamePopover";

const Unlimited = ({
  gameTab,
  setGameTab,
  unlimitedHovered,
  setUnlimitedHovered,
  modalOpened,
}) => {
  return (
    <div className="flex relative">
      <FontAwesomeIcon
        onClick={() => setGameTab("UnlimitedTimed")}
        onMouseEnter={() => setUnlimitedHovered(true)}
        onMouseLeave={() => setUnlimitedHovered(false)}
        className={`${
          gameTab === "UnlimitedTimed" ? "text-rose-600" : "text-neutral-600"
        } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
        icon={faStopwatch}
      />
      <GamePopover
        tabHovered={unlimitedHovered}
        modalOpened={modalOpened}
        gameTitle={"Unlimited"}
        gameDescription={
          "Type the alphabet as many times as possible in 30 seconds."
        }
      />
    </div>
  );
};

export default Unlimited;
