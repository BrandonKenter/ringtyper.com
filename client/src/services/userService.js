import { baseURL } from "../constants/api";

const signUpUser = async (username, email, password, confirmPassword) => {
  try {
    const response = await fetch(`${baseURL}/api/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
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

const signInUser = async (email, password) => {
  try {
    const response = await fetch(`${baseURL}/api/users/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const signOutUser = async () => {
  try {
    const response = await fetch(`${baseURL}/api/users/signout`);
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getUser = async (token) => {
  try {
    const response = await fetch(`${baseURL}/api/users/getuser/${token}`, {
      method: "GET",
    });

    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateUser = async (user) => {
  try {
    const response = await fetch(`${baseURL}/api/users/updateuser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { getUser, signInUser, signOutUser, signUpUser, updateUser };
