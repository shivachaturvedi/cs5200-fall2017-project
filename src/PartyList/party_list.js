import React from 'react';
import PartyListItem from '../PartyListItem/party_list_item';

const PartyList = (parties) => {
    console.log('in list',parties);

    const partyItems = parties.parties.map((party) => {

        return (

            <PartyListItem
                onPartySelect = {parties.onSignUp}
                client = {parties.client.id}
                party = {party} />

        );

    });

    return (
        <div className = "row">
            {partyItems}
        </div>

    );
};

export default PartyList;