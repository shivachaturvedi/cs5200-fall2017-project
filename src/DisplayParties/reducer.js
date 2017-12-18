import {
  DISPLAY_PARTIES_REQUEST_SUCCESS,
    DISPLAY_PARTIES_REQUEST_ERROR,
    DISPLAY_PARTIES_REQUEST,
} from './constants'

const initialState = {
  partyList: [], // where we'll store party
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
}

const reducer = function displayPartiesReducer (state = initialState, action) {
  switch (action.type) {
    case DISPLAY_PARTIES_REQUEST:
      return {
        partyList: [],
        requesting: true,
        successful: false,
        messages: [{
          body: `Parties: being fetched...`,
          time: new Date(),
        }],
        errors: [],
      }

    // On success include the new party into our list
    case DISPLAY_PARTIES_REQUEST_SUCCESS:
      console.log('in reducer', action.parties);
      return {
        partyList: action.parties,
        requesting: false,
        successful: true,
        messages: [{
          body: `parties: awesomely fetched!`,
          time: new Date(),
        }],
        errors: [],
      }

    case DISPLAY_PARTIES_REQUEST_ERROR:
      return {
        partyList: state.parties,
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
