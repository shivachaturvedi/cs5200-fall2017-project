import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import client from './client/reducer'
import signup from './signup/reducer'
import login from './login/reducer'
import widgets from './widgets/reducer'
import profile from './Profile/reducer'
import party from './CreateParty/reducer'
import parties from './DisplayParties/reducer'

const IndexReducer = combineReducers({
  signup,
  client,
  login,
  form,
  widgets,
  profile,
  party,
    parties
})

export default IndexReducer
