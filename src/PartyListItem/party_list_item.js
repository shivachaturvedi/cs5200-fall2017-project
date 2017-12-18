import React from 'react';
import { Panel, Button } from 'react-bootstrap';

const PartyListItem = ({party, key, client, onPartySelect}) => {
    const title = (
        <h3>{party.title}</h3>
    );
    console.log('in item', party);
    console.log('in item', client);
    console.log('in item', onPartySelect);
    const handleClick = () => {
        console.log('called');
        onPartySelect(client, party);
    }
    return(
        <Panel header={title}>
            <div>
                <div>
                    {party.description}
                </div>
                <div><b>Max Guests:</b> {party.maxPeople}</div>
                <div><b>Location: </b> {party.location}</div>
                <div><b>Start Time: </b> {party.startTime} <br/><b> End Time: </b>{party.entTime}</div>
                <div><b>Fee:</b> {party.entryFee}</div>
            </div>
            <Button bsStyle = "success" onClick={handleClick()}>I wanna go!</Button>
        </Panel>
    );
};


export default PartyListItem;