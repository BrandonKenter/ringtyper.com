import correct_sound from "../static/audio/correct.wav";
import incorrect_sound from "../static/audio/incorrect.wav";
import won_sound from "../static/audio/won.wav";

export const playCorrectSound = (user) => {
  if (user.settings.general.volume > 0) {
    const audio = new Audio(correct_sound);
    audio.volume = user.settings.general.volume / 100;
    audio.play();
  }
};

export const playWonSound = (user) => {
  if (user.settings.general.volume > 0) {
    const audio = new Audio(won_sound);
    audio.volume = user.settings.general.volume / 100;
    audio.play();
  }
};

export const playIncorrectSound = (user) => {
  if (user.settings.general.volume > 0) {
    const audio = new Audio(incorrect_sound);
    audio.volume = user.settings.general.volume / 100;
    audio.play();
  }
};
