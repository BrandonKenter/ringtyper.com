import { baseURL } from "../constants/api";

const updateGlobalLeaderboard = async (date, newGlobalLeaderboard, game) => {
  try {
    const response = await fetch(
      `${baseURL}/api/globalleaderboards/updategloballeaderboard`,
      {
        method: "PUT",
        body: JSON.stringify({
          date,
          newGlobalLeaderboard,
          game,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getGlobalLeaderboard = async () => {
  try {
    const response = await fetch(
      `${baseURL}/api/globalleaderboards/getgloballeaderboard`
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getGlobalLeaderboard, updateGlobalLeaderboard };
