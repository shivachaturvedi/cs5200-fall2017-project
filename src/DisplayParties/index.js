import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PartyList from '../PartyList/party_list'
import Messages from '../notifications/Messages'
import Errors from '../notifications/Errors'

// include our partyRequest action
import { displayPartiesRequest, signUpRequest } from './actions'

class DisplayParties extends Component {
  static propTypes = {
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      token: PropTypes.object.isRequired,
    }),
    parties: PropTypes.shape({
        partyList: PropTypes.array,
      requesting: PropTypes.bool,
      successful: PropTypes.bool,
      messages: PropTypes.array,
      errors: PropTypes.array,
    }).isRequired,
    displayPartiesRequest: PropTypes.func.isRequired,
  }

    constructor (props) {
        super(props)
        // call the fetch when the component starts up
        this.displayParties()
    }

    // the helper function for requesting profile
    // with our client as the parameter
    displayParties = () => {
        const { client, displayPartiesRequest } = this.props
        if (client && client.token) return displayPartiesRequest(client)
        else return false
    }
  render () {
    // pull in all needed props for the view
    // `invalid` is a value that Redux Form injects
    // that states whether or not our form is valid/invalid.
    // This is only relevant if we are using the concept of
    // `validators` in our form

      if(this.props.parties.partyList.length === 0){
          return <h3> Oops! No party to display! Sure you are logged in?</h3>;
      } else {
        return (<PartyList
            parties = {this.props.parties.partyList}
            onSignUp = {signUpRequest}
            client = {this.props.client}
        />);
          //return <h3> {JSON.stringify(this.props.parties.parties)} </h3>;
      }


  }
}

// Pull in both the Client and the partys state
const mapStateToProps = state => ({
  client: state.client,
  parties: state.parties,
})


const connected = connect(mapStateToProps, { displayPartiesRequest })(DisplayParties);

export default connected