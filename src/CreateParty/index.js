import React, { Component, PropTypes } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our partyRequest action
import { createPartyRequest } from './actions'

// Our validation function for `name` field.
const fieldRequired = value => (value ? undefined : 'Field is Required')

class Party extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      token: PropTypes.object.isRequired,
    }),
    party: PropTypes.shape({
      party: PropTypes.object,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    createPartyRequest: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  submit = (newParty) => {
    const { client, createPartyRequest, reset } = this.props
    // call to our partyCreate action.
    createPartyRequest(client, newParty)
    // reset the form upon submit.
    reset()
  }

  renderInput = ({ input, type, meta: { touched, error } }) => (
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
    )
  render () {
    // pull in all needed props for the view
    // `invalid` is a value that Redux Form injects
    // that states whether or not our form is valid/invalid.
    // This is only relevant if we are using the concept of
    // `validators` in our form.
    const {
      handleSubmit,
      invalid,
      party: {
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
            <h1>CREATE PARTY</h1>
            <label htmlFor="title">Title</label>
            {/* We will use a custom component AND a validator */}
            <Field
              name="title"
              type="text"
              id="title"
              className="name"
              component={this.renderInput}
              validate={fieldRequired}
            />
            <label htmlFor="description">Description</label>
            {/* We will use a custom component AND a validator */}
            <Field
              name="description"
              id="description"
              type="text"
              component="textarea"
              validate={fieldRequired}
            />
            <label htmlFor="maxPeople">Maximum People</label>
            <Field
              name="maxPeople"
              type="number"
              id="maxPeople"
              className="name"
              component="input"
            />
            <label htmlFor="location">Location</label>
            <Field
              name="location"
              type="text"
              id="location"
              className="name"
              component="input"
            />
            <label htmlFor="startTime">Start Time</label>
            <Field
                name="startTime"
                type="datetime-local"
                id="startTime"
                className="name"
                component="input"
            />
            <label htmlFor="startTime">End Time</label>
            <Field
                name="endTime"
                type="datetime-local"
                id="endTime"
                className="name"
                component="input"
            />
            <label htmlFor="maxPeople">Entry Fee</label>
            <Field
                name="entryFee"
                type="number"
                id="entryFee"
                className="name"
                component="input"
            />
            <hr />
            {/* the button will remain disabled until not invalid */}
            <button
              disabled={invalid}
              action="submit"
            >CREATE PARTY</button>
          </form>

          <div className="widget-messages">
            {requesting && <span>Creating party...</span>}
            {!requesting && !!errors.length && (
              <Errors message="Failure to create party due to:" errors={errors} />
            )}
            {!requesting && successful && !!messages.length && (
              <Messages messages={messages} />
            )}
          </div>
        </div>
      </div>
    )
  }
}

// Pull in both the Client and the partys state
const mapStateToProps = state => ({
  client: state.client,
  party: state.party,
})

// Make the Client and partys available in the props as well
// as the partyCreate() function
const connected = connect(mapStateToProps, { createPartyRequest })(Party)
const formed = reduxForm({
  form: 'party',
})(connected)

export default formed
