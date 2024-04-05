import { faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GamePopover from "../popovers/GamePopover";

const Shuffle = ({
  gameTab,
  setGameTab,
  shuffleHovered,
  setShuffleHovered,
  modalOpened,
}) => {
  return (
    <div className="flex relative">
      <FontAwesomeIcon
        onClick={() => setGameTab("Shuffle")}
        onMouseEnter={() => setShuffleHovered(true)}
        onMouseLeave={() => setShuffleHovered(false)}
        className={`${
          gameTab === "Shuffle" ? "text-rose-600" : "text-neutral-600"
        } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
        icon={faShuffle}
      />
      <GamePopover
        tabHovered={shuffleHovered}
        modalOpened={modalOpened}
        gameTitle={"Shuffle"}
        gameDescription={
          "Type the alphabet in random order as fast as possible."
        }
      />
    </div>
  );
};

export default Shuffle;
