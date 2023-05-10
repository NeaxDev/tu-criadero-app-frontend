import { BASE_URL } from "../utils/constants";

export const registerApi = async (formData) => {
  try {
    const url = `${BASE_URL}/users/register`;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, data);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const loginApi = async (formData) => {
  try {
    const url = `${BASE_URL}/users/login`;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, data);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const confirmUser = async (id) => {
  try {
    const url = `${BASE_URL}/users/confirm/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const url = `${BASE_URL}/users/forgot-password`;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const response = await fetch(url, data);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const confirmTokenValid = async (token) => {
  try {
    const url = `${BASE_URL}/users/forgot-password/${token}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const newPassword = async (token, password) => {
  try {
    const url = `${BASE_URL}/users/forgot-password/${token}`;

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };

    const response = await fetch(url, data);
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const userAuth = async (token) => {
  try {
    const url = `${BASE_URL}/users/profile`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, config);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
