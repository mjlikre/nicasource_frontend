import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (data, done) => async (dispatch) => {
  try {
    const res = await axios.post("https://mj-nicasource-test.herokuapp.com/api/auth/signup", data);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    localStorage.setItem("token", res.data.token);
    
    if (done) {
      done()
    }
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: "Email in use" });
  }
};

export const signout = (done) => {
  localStorage.removeItem("token")
  if (done) {
    done()
  }
  return {
    type: AUTH_USER,
    payload: null,
  };
};

export const signin = (formProps, done) => async (dispatch) => {
  try {
    const res = await axios.post("https://mj-nicasource-test.herokuapp.com/api/auth/signin", formProps);
    localStorage.setItem("token", res.data.token);
    dispatch({ type: AUTH_USER, payload: res.data.token });
    if (done) {
      done()
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: AUTH_ERROR, payload: "err" });
  }
};

