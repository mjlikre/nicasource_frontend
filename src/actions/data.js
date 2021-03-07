import { COVID_DATA, COVID_DATA_ERROR, SPECIFIC_COVID_DATA } from "./types";
import axios from "axios";

export const getStatistics = (data, done) => async (dispatch) => {
  try {
    const res = await axios.get("https://mj-nicasource-test.herokuapp.com/api/statistics",  {
        headers: { authorization: localStorage.getItem("token") },
      });
    dispatch({ type: COVID_DATA, payload: res.data });
    if (done) {
      done()
    }
  } catch (e) {
    dispatch({ type: COVID_DATA_ERROR, payload: e });
  }
};
export const getSpecificStatistics = (data, done) => async (dispatch) => {
    const res = await axios.get(`https://mj-nicasource-test.herokuapp.com/api/statistics/${data}`,  {
        headers: { authorization: localStorage.getItem("token") },
      });
    dispatch({ type: SPECIFIC_COVID_DATA, payload: res.data });
  if (done) {
    done()
  }
  
};

export const updateStatistics = (data, done) => async() =>{
    await axios.post(`https://mj-nicasource-test.herokuapp.com/api/statistics/${data.country}`, data.data,  {
        headers: { authorization: localStorage.getItem("token") },
      });
  if (done) {
    done()
  }
};
