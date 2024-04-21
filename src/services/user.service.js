import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

export async function createUser(userData) {
  const url = `${BASE_URL}/user/create`; // Construct the full URL properly
  try {
    const response = await axios.post(url, userData);
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}

export async function getUserDetails(token) {
  const url = `${BASE_URL}/auth`; // Construct the full URL properly
  try {
    const response = await axios.get(url, {
      headers: { auth_token: token },
    });
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}

export async function updateUserVerificationState(token, payload, id) {
  const url = `${BASE_URL}/user/update-state/${id}`; // Construct the full URL properly
  try {
    const response = await axios.post(url, payload, {
      headers: { auth_token: token },
    });
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}

export async function updateUserTxnId(token, payload, id) {
  const url = `${BASE_URL}/user/txn-id/${id}`; // Construct the full URL properly
  try {
    const response = await axios.post(url, payload, {
      headers: { auth_token: token },
    });
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}

export async function userLogin(payload) {
  const url = `${BASE_URL}/auth/login`; // Construct the full URL properly
  try {
    const response = await axios.post(url, payload);
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}


export async function updateUserDetails(token, payload, id) {
  const url = `${BASE_URL}/user/update/${id}`; // Construct the full URL properly
  try {
    const response = await axios.post(url, payload, {
      headers: { auth_token: token },
    });
    return response.data; // Assuming API returns data on successful creation
  } catch (error) {
    throw error; // Throw error for handling in the calling function
  }
}