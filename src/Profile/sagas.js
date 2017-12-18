import { call, put, takeLatest } from 'redux-saga/effects'
import { handleApiErrors } from '../lib/api-errors'
import {
    PROFILE_REPLACE_OR_CREATE,
    FETCH_USER_PROFILE,
    USER_PROFILE_UPDATE,
} from './constants'

import {
    profileReplaceOrCreateSuccess,
    profileReplaceOrCreateError,
    profileRequestSuccess,
    profileRequestError,
    userProfileUpdate,
} from './actions'

const profileUrl = `${process.env.REACT_APP_API_URL}/api/Profiles`

// Nice little helper to deal with the response
// converting it to json, and handling errors
function handleRequest (request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error })
}

function profileFindApi (client) {
  const url = `${profileUrl}/findOne`
  const filterJSON = JSON.stringify({ clientId: client.id })
  const request = fetch(url, {
    method: 'GET',
    headers: { filter: filterJSON },
  })
  return handleRequest(request)
}

function profileCreateApi (client, profile) {
  const requestBody = profile
  requestBody.clientId = client.id
  const url = `${profileUrl}/replaceOrCreate`
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

function profileUpdateApi (client, fetchedProfile, profile) {
  const requestBody = profile
  requestBody.id = fetchedProfile.id
  const url = `${profileUrl}/replaceOrCreate`
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

function* profileUpdateFlow (action) {

  try {
        // grab the client from our action
    const { client, fetchedProfile, profile } = action
        // call to our profileRequestApi function with the client
    const updatedProfile = yield call(profileUpdateApi, client, fetchedProfile, profile)
        // dispatch the action with our profiles!

    yield put(profileReplaceOrCreateSuccess(updatedProfile))
  } catch (error) {
    yield put(profileReplaceOrCreateError(error))
  }
}

function* profileReplaceOrCreateFlow (action) {
  const { client, profile } = action
  try {
    const fetchedProfile = yield call(profileFindApi, client, profile)
    yield put(userProfileUpdate(client, fetchedProfile, profile))
  } catch (error) {
    try {
      const createProfile = yield call(profileCreateApi, client, profile)
      yield put(profileReplaceOrCreateSuccess(createProfile))
    } catch (error) {
      yield put(profileReplaceOrCreateError(error))
    }
  }
}

function profileRequestApi (client) {
  const url = `${profileUrl}/`
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // passe our token as an "Authorization" header
      Authorization: client.token.id || undefined,
    },
  })

  return handleRequest(request)
}

function* profileRequestFlow (action) {
  try {
    // grab the client from our action
    const { client } = action
    // call to our profileRequestApi function with the client
    const profile = yield call(profileRequestApi, client)
    // dispatch the action with our profiles!
    yield put(profileRequestSuccess(profile[0]))
  } catch (error) {
    yield put(profileRequestError(error))
  }
}

function* profileWatcher () {
  // each of the below RECEIVES the action from the .. action
  yield [
    takeLatest(PROFILE_REPLACE_OR_CREATE, profileReplaceOrCreateFlow),
    takeLatest(FETCH_USER_PROFILE, profileRequestFlow),
    takeLatest(USER_PROFILE_UPDATE, profileUpdateFlow),
  ]
}

export default profileWatcher
