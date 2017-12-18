import {
    PROFILE_REPLACE_OR_CREATE,
    PROFILE_REPLACE_OR_CREATE_SUCCESS,
    PROFILE_REPLACE_OR_CREATE_ERROR,
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_ERROR,
} from './constants'

const initialState = {
  list: {}, // where we'll store profile
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function profileReducer (state = initialState, action) {
  switch (action.type) {
    case PROFILE_REPLACE_OR_CREATE:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Profile: ${action.profile.firstName} being created...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new profile into our list
    case PROFILE_REPLACE_OR_CREATE_SUCCESS:
      return {
        list: action.profile,
        requesting: false,
        successful: true,
        messages: [{
          body: `Profile: ${action.profile.firstName} awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case PROFILE_REPLACE_OR_CREATE_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
      }

    case FETCH_USER_PROFILE:
      return {
        ...state, // ensure that we don't erase fetched ones
        requesting: false,
        successful: true,
        messages: [{
          body: 'Fetching profiles...!',
          time: new Date(),
        }],
        errors: [],
      }

    case FETCH_USER_PROFILE_SUCCESS:
      return {
        list: action.profile, // replace with fresh list
        requesting: false,
        successful: true,
        messages: [{
          body: 'Profile awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      }

    case FETCH_USER_PROFILE_ERROR:
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      }

    default:
      return state
  }
}

export default reducer
