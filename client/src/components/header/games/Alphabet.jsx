import { faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GamePopover from "../popovers/GamePopover";

const Alphabet = ({
  gameTab,
  setGameTab,
  alphabetHovered,
  setAlphabetHovered,
  modalOpened,
}) => {
  return (
    <div className="relative flex">
      <FontAwesomeIcon
        onClick={() => setGameTab("Alphabet")}
        onMouseEnter={() => setAlphabetHovered(true)}
        onMouseLeave={() => setAlphabetHovered(false)}
        className={`${
          gameTab === "Alphabet" ? "text-rose-600" : "text-neutral-600"
        } w-5 h-4 hover:text-neutral-300 transition duration-300 cursor-pointer p-1`}
        icon={faArrowDownAZ}
      />
      <GamePopover
        tabHovered={alphabetHovered}
        modalOpened={modalOpened}
        gameTitle={"Classic"}
        gameDescription={"Type the alphabet as fast as possible."}
      />
    </div>
  );
};

export default Alphabet;
