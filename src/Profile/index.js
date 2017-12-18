import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our profileRequest action
import { profileReplaceOrCreate, profileRequest } from './actions'

// Our validation function for `name` field.
const nameRequired = value => (value ? undefined : 'Name Required');

class Profile extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      token: PropTypes.object.isRequired,
    }),
    profile: PropTypes.shape({
      list: PropTypes.object,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    profileReplaceOrCreate: PropTypes.func.isRequired,
    profileRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  constructor (props) {
    super(props)
    // call the fetch when the component starts up
    this.fetchProfile()
  }

  // the helper function for requesting profile
  // with our client as the parameter
  fetchProfile = () => {
    const { client, profileRequest } = this.props
    if (client && client.token) return profileRequest(client)
    return false
  }


  submit = (profile) => {
    const { client, profileReplaceOrCreate, reset } = this.props
    // call to our profileCreate action.
    profileReplaceOrCreate(client, profile)
    // reset the form upon submit.
    reset()
  }

  renderNameInput = ({ input, type, meta: { touched, error } }) => (
    <div>
      {/* Spread RF's input properties onto our input */}
      <input
        {...input}
        type={type}
      />
      {/*
        If the form has been touched AND is in error, show `error`.
        `error` is the message returned from our validate function above
        which in this case is `Name Required`.

        `touched` is a live updating property that RF passes in.  It tracks
        whether or not a field has been "touched" by a user.  This means
        focused at least once.
      */}
      {touched && error && (
        <div style={{ color: '#cc7a6f', margin: '-10px 0 15px', fontSize: '0.7rem' }}>
          {error}
        </div>
        )
      }
    </div>
  );

  render () {
    // pull in all needed props for the view
    // `invalid` is a value that Redux Form injects
    // that states whether or not our form is valid/invalid.
    // This is only relevant if we are using the concept of
    // `validators` in our form.
    const {
      handleSubmit,
      invalid,
      profile: {
        list,
        requesting,
        successful,
        messages,
        errors,
      },
    } = this.props

    return (
      <div className="widgets">
        <div className="widget-form">
          <form onSubmit={handleSubmit(this.submit)}>
            <h1>UPDATE PROFILE</h1>
            <label htmlFor="firstName">First Name</label>
            {/* We will use a custom component AND a validator */}
            <Field
              name="firstName"
              type="text"
              id="firstName"
              className="name"
              component={this.renderNameInput}
              validate={nameRequired}
            />
            <label htmlFor="lastName">Last Name</label>
            {/* We will use a custom component AND a validator */}
            <Field
              name="lastName"
              type="text"
              id="lastName"
              className="name"
              component={this.renderNameInput}
              validate={nameRequired}
            />
            <label htmlFor="about">Favorite Quote</label>
            <Field
              name="about"
              type="text"
              id="aboutme"
              className="description"
              component="input"
            />
            <label htmlFor="poison">Favorite Poison</label>
            <Field
              name="poison"
              type="text"
              id="poison"
              className="name"
              component="input"
            />
            {/* the button will remain disabled until not invalid */}
            <button
              disabled={invalid}
              action="submit"
            >CREATE/UPDATE</button>
          </form>
          <hr />
          <div className="widget-messages">
            {requesting && <span>Creating profile...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create profile due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
        <div className="widget-list">
          <table>
            <thead colSpan={2}>
            <tr>
              <th>Current Profile</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><b>First Name</b></td>
              <td>{list.firstName}</td>
            </tr>
            <tr>
              <td><b>Last Name</b></td>
              <td>{list.lastName}</td>
            </tr>
            <tr>
              <td><b>Favorite Quote</b></td>
              <td>{list.about}</td>
            </tr>
            <tr>
              <td><b>Favorite Poison</b></td>
              <td>{list.poison}</td>
            </tr>
            </tbody>
          </table>
            {/* A convenience button to refetch on demand */}
          <button onClick={this.fetchProfile}>Refetch Profile!</button>
        </div>
      </div>
    )
  }
}

// Pull in both the Client and the profiles state
const mapStateToProps = state => ({
  client: state.client,
  profile: state.profile,
})

// Make the Client and profiles available in the props as well
// as the profileCreate() function
const connected = connect(mapStateToProps, { profileReplaceOrCreate, profileRequest })(Profile)
const formed = reduxForm({
  form: 'profile',
})(connected)

export default formed
