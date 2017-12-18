import SignupSaga from './signup/sagas'
import LoginSaga from './login/sagas'
import WidgetSaga from './widgets/sagas'
import ProfileSaga from './Profile/sagas'
import CreatePartySaga from './CreateParty/sagas'
import DisplayPartiesSaga from './DisplayParties/sagas'

export default function* IndexSaga () {
  yield [
    SignupSaga(),
    LoginSaga(),
    WidgetSaga(),
    ProfileSaga(),
    CreatePartySaga(),
      DisplayPartiesSaga()
  ]
}
