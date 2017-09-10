import * as types from './types';

const requestContacts = () => ({
    type: types.REQUEST_CONTACTS
});

const deleteContactById = (id) => ({
    type: types.DELETE_CONTACT_BY_ID,
    payload: { id }
});

const deleteContactSuccess = (message) => ({
    type: types.DELETE_CONTACT_SUCCESS,
    payload: { message }
}); 

const deleteContactError = (message) => ({
    type: types.DELETE_CONTACT_SUCCESS,
    payload: { message }
}); 

const createContact = (data) => ({
    type: types.CREATE_CONTACT,
    payload: { data }
});

// TODO remove this function and make new user popup form.
const selectEmptyUser = () => ({
    type: types.SELECT_EMPTY
});

const selectContactById = (data) => ({
    type: types.REQUEST_CONTACT_BY_ID,
    payload: { data }
});

const getContactSuccess = (data) => ({
    type: types.GET_CONTACT_SUCCESS,
    payload: { data }
});

const getContactError = ( message ) => ({
    type: types.GET_CONTACT_ERROR,
    payload: { message }
});

const requestContactsSuccess = (data) => ({
    type: types.REQUEST_CONTACTS_SUCCESS,
    payload: { data }
  });

const editContactSuccess = (data) => ({
    type: types.EDIT_CONTACT_SUCCESS,
    payload: { data }
});

const editContact = (data) => ({
    type: types.EDIT_CONTACT,
    payload: { data }
});

const requestProductsError = (message) => ({
    type: types.REQUEST_CONTACTS_ERROR,
    payload: { message }
});

const createContactError = (message) => ({
    type: types.CREATE_CONTACT_ERROR,
    payload: { message }
});

const editContactError = (message) => ({
    type: types.EDIT_CONTACT_ERROR,
    payload: { message }
});

const createContactSuccess = (message) => ({
    type: types.CREATE_CONTACT_SUCCESS,
    payload: { message }
});

export {
    requestContacts,
    requestContactsSuccess,
    requestProductsError,
    selectContactById,
    editContact,
    editContactSuccess,
    getContactSuccess,
    deleteContactById,
    createContact,
    selectEmptyUser,
    createContactSuccess,
    createContactError,
    editContactError,
    getContactError,
    deleteContactSuccess,
    deleteContactError
};
