import { faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GamePopover from "../popovers/GamePopover";

const Reverse = ({
  gameTab,
  setGameTab,
  reverseHovered,
  setReverseHovered,
  modalOpened,
}) => {
  return (
    <div className="relative flex">
      <FontAwesomeIcon
        onClick={() => setGameTab("ReverseAlphabet")}
        onMouseEnter={() => setReverseHovered(true)}
        onMouseLeave={() => setReverseHovered(false)}
        className={`${
          gameTab === "ReverseAlphabet" ? "text-rose-600" : "text-neutral-600"
        } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
        icon={faArrowUpAZ}
      />
      <GamePopover
        tabHovered={reverseHovered}
        modalOpened={modalOpened}
        gameTitle={"Reverse"}
        gameDescription={"Type the reverse alphabet as fast as possible."}
      />
    </div>
  );
};

export default Reverse;
