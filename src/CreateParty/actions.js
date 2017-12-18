import {
    CREATE_PARTY_REQUEST,
    CREATE_PARTY_REQUEST_ERROR,
    CREATE_PARTY_REQUEST_SUCCESS,
} from './constants'

export const createPartyRequest = function createPartyRequest (client, party) {
  return {
    type: CREATE_PARTY_REQUEST,
    client,
    party,
  }
}

export const createPartyRequestError = function createPartyRequestError (error) {
  return {
    type: CREATE_PARTY_REQUEST_ERROR,
    error,
  }
}

export const createPartyRequestSuccess = function createPartyRequest (party) {
  return {
    type: CREATE_PARTY_REQUEST_SUCCESS,
    party,
  }
}

