import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';
import {
  GET_LEADS,
  DELETE_LEAD,
  ADD_LEAD,
  EDIT_LEAD,
  CLEAR_EDIT,
  UPDATE_LEAD
} from './types';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get('/api/leads/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LEADS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE LEAD
export const deleteLead = id => (dispatch, getState) => {
  axios
    .delete(`/api/leads/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
      dispatch({
        type: DELETE_LEAD,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD LEAD
export const addLead = lead => (dispatch, getState) => {
  axios
    .post('/api/leads/', lead, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ addLead: 'Lead Added' }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDIT LEAD
export const editLead = (id, name, email, message) => dispatch => {
  const data = {
    id: id,
    name: name,
    email: email,
    message: message
  };
  dispatch({
    type: EDIT_LEAD,
    payload: data
  });
};

// UPDATE LEAD
export const updateLead = (id, name, email, message) => (
  dispatch,
  getState
) => {
  const data = {
    name: name,
    email: email,
    message: message
  };
  axios
    .put(`/api/leads/${id}/`, data, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ updateLead: 'Lead Updated' }));
      dispatch({
        type: UPDATE_LEAD,
        payload: res
      });
    })
    .catch(err => console.log(err));
};

// CLEAR EDIT
export const clearEdit = () => dispatch => {
  dispatch({
    type: CLEAR_EDIT
  });
};
