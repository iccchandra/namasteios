import { makeNetworkRequest } from '../store/utility';
import _ from 'lodash';
import { getContacts } from '../utils/contact';
import * as actionTypes from './actionTypes';

export const contactUploaded = (data) => {
    return {
        type: actionTypes.CONTACT_UPLOAD,
        contactUploaded: data
    }
}

export const uploadContacts = (contacts) => {
    const contactList = [];
    _.map(contacts, (contact) => {
        const mobileNumber = (_.find(contact.phoneNumbers, ['label', 'mobile'])?.number);
        if (mobileNumber) {
            return contactList.push({
                n: contact.givenName+' '+contact.familyName,
                m: mobileNumber
            })
        }
    })
    return (dispatch, getState) => {
            const { data: { UserDetails } } = getState().auth?.data;
            const data = {
                namasteid: UserDetails._id,
                contacts : JSON.stringify(contactList)
            }
            dispatch(makeNetworkRequest({
                url: "/api/contact_sync",
                onSuccess: contactUploaded,
                // label: actionTypes.SYNC_CONTACT,
                method: 'POST',
                data
            }));
    }
}
