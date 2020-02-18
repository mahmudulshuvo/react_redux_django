import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  EDIT_LEAD,
  CLEAR_LEADS,
  CLEAR_EDIT,
  UPDATE_LEAD
} from '../actions/types.js';
import Leads from '../components/leads/Leads.js';

const initialState = {
  leads: [],
  editLead: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_LEADS:
      return {
        ...state,
        leads: action.payload,
        editLead: {}
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload),
        editLead: {}
      };
    case ADD_LEAD:
      return {
        ...state,
        leads: [...state.leads, action.payload],
        editLead: {}
      };
    case EDIT_LEAD:
      return {
        ...state,
        editLead: action.payload
      };
    case CLEAR_LEADS:
      return {
        ...state,
        leads: [],
        editLead: {}
      };
    case CLEAR_EDIT:
      return {
        ...state,
        editLead: {}
      };
    case UPDATE_LEAD:
      for (let index = 0; index < state.leads.length; index++) {
        if (state.leads[index].id === action.payload.id) {
          state.leads[index] = action.payload;
        }
      }
      return {
        ...state,
        editLead: {}
      };
    default:
      return state;
  }
}
