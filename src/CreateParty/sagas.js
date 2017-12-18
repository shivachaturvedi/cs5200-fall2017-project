import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
    CREATE_PARTY_REQUEST,
} from './constants'

import {
    createPartyRequestError,
    createPartyRequestSuccess,
} from './actions'

const partyUrl = `${process.env.REACT_APP_API_URL}/api/Parties`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function partyCreateApi (client, party) {
  const requestBody = party
  requestBody.clientId = client.id
  const url = `${partyUrl}/`
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

  return handleRequest(request)
}

function* createPartyWorkflow (action) {
  try {
    console.log(action)
    // grab the client from our action
    const { client, party } = action
    // call to our partyRequestApi function with the client
    const newParty = yield call(partyCreateApi, client, party)
    // dispatch the action with our partys!
    yield put(createPartyRequestSuccess(newParty))
  } catch (error) {
    yield put(createPartyRequestError(error))
  }
}

function* partyWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(CREATE_PARTY_REQUEST, createPartyWorkflow),
  ]
}

export default partyWatcher
