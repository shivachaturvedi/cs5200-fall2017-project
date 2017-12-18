import {
  CREATE_PARTY_REQUEST_SUCCESS,
    CREATE_PARTY_REQUEST_ERROR,
    CREATE_PARTY_REQUEST,
} from './constants'

const initialState = {
  party: {}, // where we'll store party
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function createPartyReducer (state = initialState, action) {
  switch (action.type) {
    case CREATE_PARTY_REQUEST:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{
          body: `Party: being created...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new party into our list
    case CREATE_PARTY_REQUEST_SUCCESS:
      return {
        list: action.party,
        requesting: false,
        successful: true,
        messages: [{
          body: `party: awesomely created!`,
          time: new Date(),
        }],
        errors: [],
      }

    case CREATE_PARTY_REQUEST_ERROR:
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
    default:
      return state
  }
}

export default reducer
