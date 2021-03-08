import { COVID_DATA, COVID_DATA_ERROR, SPECIFIC_COVID_DATA, AUTH_USER } from "./types";
import axios from "axios";

export const getStatistics = (done) => async (dispatch) => {
// gets all the data
  try {
    const res = await axios.get("https://mj-nicasource-test.herokuapp.com/api/statistics",  {
        headers: { authorization: localStorage.getItem("token") },
      });
    dispatch({ type: COVID_DATA, payload: res.data });
    if (done) {
      done()
    }
  } catch (error) {
    //handles auth error, if authentication was not successful, remove the token from local storage which will log users out
    if (error.response.data) {
      localStorage.removeItem("token")
      dispatch({ type: AUTH_USER, payload: null,})
    }
    dispatch({ type: COVID_DATA_ERROR, payload: error });
  }
};
export const getSpecificStatistics = (data, done) => async (dispatch) => {
// gets specific data, takes 2 parameters, data(country name to sent) and done(callback). data needs to be a string. 
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
// updates specific data, takes in 2 parameters, data (the data to sent to the api) and done(callback function)
// the data parameter needs to be an object that has 2 keys, country and data. the data key of the data parameter also needs to have 2 keys, 
//update and difference, where update is used to update the individual country's data and difference is used to update the sum data on each continent
  try{
     await axios.post(`https://mj-nicasource-test.herokuapp.com/api/statistics/${data.country}`, data.data,  {
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
  // syncs with the rapidapi covid database
  try{
    await axios.get(`https://mj-nicasource-test.herokuapp.com/api/sync`, {
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
