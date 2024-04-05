const initialUserState = {
  user: {
    joined: null,
    settings: {
      general: {
        volume: 50,
        focus: false,
        quickReset: "enter",
        showErrors: true,
        perfectionMode: false,
      },
      games: {
        classic: {
          maximumTime: 0,
        },
        reverse: {
          maximumTime: 0,
        },
        shuffle: {
          maximumTime: 0,
        },
        unlimited: {
          maximumTime: 30,
        },
      },
    },
  },
  leaderboards: {
    classic: {
      personal: [],
      global: [],
    },
    reverse: {
      personal: [],
      global: [],
    },
    shuffle: {
      personal: [],
      global: [],
    },
    unlimited: {
      personal: [],
      global: [],
    },
  },
  personalStats: {
    id: String,
    classic: {
      gamesPlayed: 0,
      errors: 0,
      cumulativeTime: 0,
      bestTime: 0,
      missedChars: {},
    },
    reverse: {
      gamesPlayed: 0,
      errors: 0,
      cumulativeTime: 0,
      bestTime: 0,
      missedChars: {},
    },
    shuffle: {
      gamesPlayed: 0,
      errors: 0,
      cumulativeTime: 0,
      bestTime: 0,
      missedChars: {},
    },
    unlimited: {
      gamesPlayed: 0,
      errors: 0,
      cumulativeCharacters: 0,
      bestCharacters: 0,
      missedChars: {},
    },
  },
};

export default initialUserState;
