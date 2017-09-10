import * as types from './types';

const emptyContact = {
    name: '',
    phone: '',
    address: '',
    email: '',
    web: '',
    birthday: ''
};
const initState = {
    contacts: [],
    selectedContact: emptyContact
};

const reducer = (state = initState, action) => {
    const { payload } = action;
    switch (action.type) {
        case types.REQUEST_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: payload.data,
                selectedContact: emptyContact
            };
        case types.EDIT_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact.id === payload.data.id) {
                        return payload.data;
                    } else {
                        return contact;
                    }
                })
            };
        case types.GET_CONTACT_SUCCESS:
            return {
                ...state,
                selectedContact: Object.assign({}, payload.data)
            };
        case types.SELECT_EMPTY:
            return {
                ...state,
                selectedContact: emptyContact
            };
        default:
            return state;
    }
};

export default reducer;


