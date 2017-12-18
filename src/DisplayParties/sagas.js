import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
  DISPLAY_PARTIES_REQUEST_ERROR,
    DISPLAY_PARTIES_REQUEST_SUCCESS,
    DISPLAY_PARTIES_REQUEST,
    SIGNUP_REQUEST
} from './constants'

import {
    displayPartiesRequest,
    displayPartiesRequestError,
    displayPartiesRequestSuccess,
    signUpRequestSuccess
} from './actions'

const partyUrl = `${process.env.REACT_APP_API_URL}/api/Parties`
const guestUrl = `${process.env.REACT_APP_API_URL}/api/Guests`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function listPartiesApi (client) {
  const url = `${partyUrl}/`
  const request = fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          // passe our token as an "Authorization" header
          Authorization: client.token.id || undefined,
      },
  })
    console.log('Got called');
  return handleRequest(request)
}

function addGuestsApi (client, party) {
    console.log('in api');
    console.log(client);
    console.log(party);

    const requestBody = {
        id: client.id,
        partyId: party.id
    };
    const url = `${guestUrl}/`
    const request = fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // passes our token as an "Authorization" header in
            // every POST request.
            Authorization: client.token.id || undefined, // will throw an error if no login
        },
        body: JSON.stringify(requestBody),
    })
    console.log('Got called');
    return handleRequest(request)
}

function* displayPartiesWorkflow (action) {
  try {
    console.log(action)
    // grab the client from our action
    const { client } = action
    // call to our partyRequestApi function with the client
    const newParty = yield call(listPartiesApi, client)
    // dispatch the action with our partys!
    yield put(displayPartiesRequestSuccess(newParty))
  } catch (error) {
    yield put(displayPartiesRequestError(error))
  }
}

function* signUpPartyWorkFlow(action){
    console.log(action);
    try {

        // grab the client from our action
        const { client, party } = action
        // call to our partyRequestApi function with the client
        const newGuest = yield call(addGuestsApi, client, party)
        // dispatch the action with our partys!
        yield put(signUpRequestSuccess(newGuest))
    } catch (error) {
        console.log(error)
    }
}

function* partyWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(DISPLAY_PARTIES_REQUEST, displayPartiesWorkflow),
      takeLatest(SIGNUP_REQUEST, signUpPartyWorkFlow),
  ]
}

export default partyWatcher
