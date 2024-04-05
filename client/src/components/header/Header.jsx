import { useEffect, useState } from "react";
import useCurrentUTCTime from "../../hooks/useCurrentUTCTime";
import Focus from "./focus/Focus";
import Alphabet from "./games/Alphabet";
import Reverse from "./games/Reverse";
import Shuffle from "./games/Shuffle";
import Unlimited from "./games/Unlimited";
import InformationModal from "./modals/InformationModal";
import NotificationsModal from "./modals/NotificationsModal";
import ProfileModal from "./modals/ProfileModal";
import SettingsModal from "./modals/SettingsModal";
import StatsModal from "./modals/statsModal/StatsModal";
import Volume from "./popovers/VolumePopover";

const Header = ({ user, setUser, gameTab, setGameTab, personalStats }) => {
  const currentTime = useCurrentUTCTime();

  // Hovered state
  const [alphabetHovered, setAlphabetHovered] = useState(false);
  const [reverseHovered, setReverseHovered] = useState(false);
  const [unlimitedHovered, setUnlimitedHovered] = useState(false);
  const [shuffleHovered, setShuffleHovered] = useState(false);
  const [settingsHovered, setSettingsHovered] = useState(false);
  const [volumeHovered, setVolumeHovered] = useState(false);
  const [informationHovered, setInformationHovered] = useState(false);
  const [focusHovered, setFocusHovered] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);
  const [statsHovered, setStatsHovered] = useState(false);
  const [notificationsHovered, setNotificationsHovered] = useState(false);

  // Modal opened state
  const [settingsModalOpened, setSettingsModalOpened] = useState(false);
  const [statsModalOpened, setStatsModalOpened] = useState(false);
  const [profileModalOpened, setProfileModalOpened] = useState(false);
  const [informationModalOpened, setInformationModalOpened] = useState(false);
  const [notificationsModalOpened, setNotificationsModalOpened] =
    useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleFocusClick = () => {
    setTransitioning(true);
  };

  useEffect(() => {
    setModalOpened(
      settingsModalOpened ||
        informationModalOpened ||
        profileModalOpened ||
        statsModalOpened ||
        notificationsModalOpened
    );
  }, [
    settingsModalOpened,
    informationModalOpened,
    profileModalOpened,
    statsModalOpened,
    notificationsModalOpened,
  ]);

  useEffect(() => {
    if (transitioning) {
      const timeout = setTimeout(() => {
        setTransitioning(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [transitioning]);

  return (
    <div
      className={`flex w-full flex-col items-center justify-center select-none`}
    >
      <div
        className={`${
          transitioning || user.settings.general.focus ? "overflow-hidden" : ""
        }
          ${!user.settings.general.focus ? "w-full" : "w-[280px]"}
          relative transition-all duration-1000 py-0.5 bg-neutral-900 divide-neutral-800 max-w-4xl rounded-lg flex items-center justify-evenly px-5 shadow-lg`}
      >
        <div className="flex items-center justify-evenly gap-1 w-[230px] max-w-[230px] min-w-[200px]">
          <div>
            <span className="text-neutral-300 font-extrabold text-sm whitespace-nowrap">
              {currentTime + " UTC"}
            </span>
          </div>
          <InformationModal
            informationModalOpened={informationModalOpened}
            setInformationModalOpened={setInformationModalOpened}
            informationHovered={informationHovered}
            setInformationHovered={setInformationHovered}
            modalOpened={modalOpened}
          />
          <SettingsModal
            settingsModalOpened={settingsModalOpened}
            setSettingsModalOpened={setSettingsModalOpened}
            settingsHovered={settingsHovered}
            setSettingsHovered={setSettingsHovered}
            modalOpened={modalOpened}
            user={user}
            setUser={setUser}
          />
          <Volume
            user={user}
            setUser={setUser}
            volumeHovered={volumeHovered}
            setVolumeHovered={setVolumeHovered}
            modalOpened={modalOpened}
          />
        </div>
        <div className="text-neutral-700 text-xl w-3 max-w-3">|</div>
        <div className="flex items-center justify-evenly gap-1 w-[230px] max-w-[230px] min-w-[200px]">
          <Focus
            user={user}
            setUser={setUser}
            focusHovered={focusHovered}
            setFocusHovered={setFocusHovered}
            modalOpened={modalOpened}
            handleFocusClick={handleFocusClick}
          />
          <Alphabet
            gameTab={gameTab}
            setGameTab={setGameTab}
            alphabetHovered={alphabetHovered}
            setAlphabetHovered={setAlphabetHovered}
            modalOpened={modalOpened}
          />
          <Reverse
            gameTab={gameTab}
            setGameTab={setGameTab}
            reverseHovered={reverseHovered}
            setReverseHovered={setReverseHovered}
            modalOpened={modalOpened}
          />
          <Shuffle
            gameTab={gameTab}
            setGameTab={setGameTab}
            shuffleHovered={shuffleHovered}
            setShuffleHovered={setShuffleHovered}
            modalOpened={modalOpened}
          />
          <Unlimited
            gameTab={gameTab}
            setGameTab={setGameTab}
            unlimitedHovered={unlimitedHovered}
            setUnlimitedHovered={setUnlimitedHovered}
            modalOpened={modalOpened}
          />
        </div>
        <div className="text-neutral-700 text-xl w-3 max-w-3">|</div>
        <div className="flex items-center justify-evenly gap-1 w-[230px] max-w-[230px] min-w-[200px]">
          <NotificationsModal
            notificationsModalOpened={notificationsModalOpened}
            setNotificationsModalOpened={setNotificationsModalOpened}
            notificationsHovered={notificationsHovered}
            setNotificationsHovered={setNotificationsHovered}
            modalOpened={modalOpened}
            user={user}
          />
          <StatsModal
            statsModalOpened={statsModalOpened}
            setStatsModalOpened={setStatsModalOpened}
            statsHovered={statsHovered}
            setStatsHovered={setStatsHovered}
            modalOpened={modalOpened}
            user={user}
            personalStats={personalStats}
          />
          <ProfileModal
            profileModalOpened={profileModalOpened}
            setProfileModalOpened={setProfileModalOpened}
            profileHovered={profileHovered}
            setProfileHovered={setProfileHovered}
            modalOpened={modalOpened}
            user={user}
          />
          <span className="font-extrabold text-neutral-300">
            {user._id ? user.username : "Guest"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
