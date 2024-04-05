import { baseURL } from "../constants/api";

const updatePersonalLeaderboard = async (
  id,
  date,
  newPersonalLeaderboard,
  game
) => {
  try {
    const response = await fetch(
      `${baseURL}/api/personalleaderboards/updatepersonalleaderboard`,
      {
        method: "PUT",
        body: JSON.stringify({
          id,
          date,
          newPersonalLeaderboard,
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

const getPersonalLeaderboard = async (id) => {
  try {
    const response = await fetch(
      `${baseURL}/api/personalleaderboards/getpersonalleaderboard/${id}`
    );
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getPersonalLeaderboard, updatePersonalLeaderboard };
