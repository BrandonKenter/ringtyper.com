import { baseURL } from "../constants/api";

const updatePersonalStats = async (id, newPersonalStats) => {
  try {
    const response = await fetch(`${baseURL}/api/personalstats/updatePersonalStats`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        newPersonalStats: newPersonalStats,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getPersonalStats = async (id) => {
  try {
    const response = await fetch(`${baseURL}/api/personalstats/getpersonalstats/${id}`);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { updatePersonalStats, getPersonalStats };
