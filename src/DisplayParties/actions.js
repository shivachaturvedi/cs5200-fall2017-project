import {
    DISPLAY_PARTIES_REQUEST,
    DISPLAY_PARTIES_REQUEST_SUCCESS,
    DISPLAY_PARTIES_REQUEST_ERROR,
    SIGNUP_REQUEST,
    SIGNUP_REQUEST_REQUEST_ERROR,
    SIGNUP_REQUEST_REQUEST_SUCCESS,
} from './constants'

export const displayPartiesRequest = function displayPartiesRequest (client) {
  return {
    type: DISPLAY_PARTIES_REQUEST,
      client
  }
}

export const displayPartiesRequestError = function displayPartiesRequestError (error) {
  return {
    type: DISPLAY_PARTIES_REQUEST_ERROR,
    error,
  }
}

export const displayPartiesRequestSuccess = function displayPartiesRequestSuccess (parties) {
    console.log('in action', parties);
  return {
    type: DISPLAY_PARTIES_REQUEST_SUCCESS,
    parties,
  }
}

export const signUpRequest = function signUpRequest (client, party) {
    console.log('in action');
    console.log(client);
    console.log(party);
    return {
        type: SIGNUP_REQUEST,
        client, party
    }
}

export const signUpRequestSuccess = function signUpRequestSuccess (guest) {
    console.log('in action guest', guest);
    return {
        type: SIGNUP_REQUEST_REQUEST_SUCCESS,
        guest,
    }
}
