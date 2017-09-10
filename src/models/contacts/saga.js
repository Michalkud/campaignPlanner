import { put, call, takeLatest, fork } from 'redux-saga/effects';
import _ from 'lodash';

import * as actions from './actions';
import * as types from './types';
import API from 'services/api';


const _requestContacts = function* () {
    const contacts = yield call(API.fetchContacts);
    if (_.isObjectLike(contacts)) {
        yield put(actions.requestContactsSuccess(contacts));
    } else {
        yield put(actions.requestProductsError('Something went wrong'));
    }
};

const _editContact = function* (data) {
    const contact = yield call(API.editContact, data.payload.data);

    if (_.isObjectLike(contact)) {
        yield put(actions.editContactSuccess(contact));
    } else {
        yield put(actions.editContactError('Error while editing contact!'));
    }
};

const _requestContactById = function* (data) {
    const contact = yield call(API.getContact, data.payload.data);

    if (_.isObjectLike(contact)) {
        yield put(actions.getContactSuccess(contact));
    } else {
        yield put(actions.getContactError('Error while loading contact!'));
    }
};

const _deleteContactById = function* (data) {

    const res = yield call(API.deleteContactById, data.payload.id);

    if (res === 'OK') {
        const contacts = yield call(API.fetchContacts);
        yield put(actions.requestContactsSuccess(contacts));
        yield put(actions.deleteContactSuccess('Contact successfully deleted!'));
    } else {
        yield put(actions.deleteContactError('Something went wrong while contact deleting!'));
    }
};

const _createContact = function* (data) {
    const contact = yield call(API.createContact, data.payload.data);

    if (_.isObjectLike(contact)) {
        const contacts = yield call(API.fetchContacts);
        yield put(actions.requestContactsSuccess(contacts));
        yield put(actions.createContactSuccess('Contact was succesfully created!'));
    } else {
        yield put(actions.createContactError('Something went wrong!'));
    }
};

const editContact = function* () {
    yield takeLatest(types.EDIT_CONTACT, _editContact);
};

const requestContactById = function* () {
    yield takeLatest(types.REQUEST_CONTACT_BY_ID, _requestContactById);
};

const requestContacts = function* () {
    yield takeLatest(types.REQUEST_CONTACTS, _requestContacts);
};

const deleteContactById = function* () {
    yield takeLatest(types.DELETE_CONTACT_BY_ID, _deleteContactById);
};

const createContact = function* () {
    yield takeLatest(types.CREATE_CONTACT, _createContact);
};

const saga = [
    requestContacts,
    editContact,
    requestContactById,
    deleteContactById,
    createContact
];

export default saga.map(s => fork(s));

