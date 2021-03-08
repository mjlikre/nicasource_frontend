import { COVID_DATA, COVID_DATA_ERROR, SPECIFIC_COVID_DATA } from "./types";
import axios from "axios";

export const getStatistics = (data, done) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:3001/api/statistics",  {
        headers: { authorization: localStorage.getItem("token") },
      });
    dispatch({ type: COVID_DATA, payload: res.data });
    if (done) {
      done()
    }
  } catch (error) {
    if (error.response.data) {
      localStorage.removeItem("token")
      dispatch({ type: AUTH_USER, payload: null,})

    }
    dispatch({ type: COVID_DATA_ERROR, payload: error });
  }
};
export const getSpecificStatistics = (data, done) => async (dispatch) => {
  try{
    const res = await axios.get(`https://mj-nicasource-test.herokuapp.com/api/statistics/${data}`,  {
        headers: { authorization: localStorage.getItem("token") },
      });
    dispatch({ type: SPECIFIC_COVID_DATA, payload: res.data });
  if (done) {
    done()
  }
  }catch (error) {
    if (error.response.data) {
      localStorage.removeItem("token")
      dispatch({ type: AUTH_USER, payload: null,})

    }
  };
}

export const updateStatistics = (data, done) => async(dispatch) =>{
  try{
     await axios.post(`http://localhost:3001/api/statistics/${data.country}`, data.data,  {
        headers: { authorization: localStorage.getItem("token") },
      });
  if (done) {
    done()
  }
  }catch (error) {
    if (error.response.data) {
      localStorage.removeItem("token")
      dispatch({ type: AUTH_USER, payload: null,})

    }
   
};
}

export const sync = (done) => async(dispatch) => {
  try{
    await axios.get(`http://localhost:3001/api/sync`, {
        headers: { authorization: localStorage.getItem("token") },
      });
      if (done) {
        done()
      }
  }catch (error) {
    if (error.response.data) {
      localStorage.removeItem("token")
      dispatch({ type: AUTH_USER, payload: null,})

    }
  }
  
}
