import { COVID_DATA, SPECIFIC_COVID_DATA, COVID_DATA_ERROR } from "../actions/types";

const INITIAL_STATE = {
  statistics: '',
  error: '',
  specific: "",
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case COVID_DATA:
      return { ...state, statistics: action.payload };
    case SPECIFIC_COVID_DATA:
    return { ...state, specific: action.payload };
    case COVID_DATA_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
