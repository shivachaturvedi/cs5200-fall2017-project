import {
    PROFILE_REPLACE_OR_CREATE,
    PROFILE_REPLACE_OR_CREATE_SUCCESS,
    PROFILE_REPLACE_OR_CREATE_ERROR,
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_ERROR,
    USER_PROFILE_UPDATE,
} from './constants'

export const userProfileUpdate = function userProfileUpdate (client, fetchedProfile, profile) {
  return {
    type: USER_PROFILE_UPDATE,
    client,
    fetchedProfile,
    profile,
  }
}
export const profileReplaceOrCreate = function profileReplaceOrCreate (client, profile) {
  return {
    type: PROFILE_REPLACE_OR_CREATE,
    client,
    profile,
  }
}

export const profileReplaceOrCreateSuccess = function profileReplaceOrCreateSuccess (profile) {
  return {
    type: PROFILE_REPLACE_OR_CREATE_SUCCESS,
    profile,
  }
}

export const profileReplaceOrCreateError = function profileReplaceOrCreateSuccess (error) {
  return {
    type: PROFILE_REPLACE_OR_CREATE_ERROR,
    error,
  }
}

export const profileRequest = function profileRequest (client) {
  return {
    type: FETCH_USER_PROFILE,
    client,
  }
}

export const profileRequestSuccess = function profileRequestSuccess (profile) {
  return {
    type: FETCH_USER_PROFILE_SUCCESS,
    profile,
  }
}

export const profileRequestError = function profileRequestError (error) {
  return {
    type: FETCH_USER_PROFILE_ERROR,
    error,
  }
}
