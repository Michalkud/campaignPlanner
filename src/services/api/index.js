import axios from 'axios';

const requester = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 1000
  });

class API {



    fetchContacts() {
        return new Promise((resolve, reject) => {
            requester.get('/list')
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
            });
        });
    }

    editContact(data) {
        return new Promise((resolve, reject) => {

            requester.put('/edit/' + data.id, data )
              .then(function (response) {
                resolve(response.data);
              })
              .catch(function (error) {
              });

        });
    }

    getContact(id) {
        return new Promise((resolve, reject) => {
            
            requester.get('/detail/' + id)
                .then(function (response) {
                resolve(response.data);
                })
                .catch(function (error) {
                });
            
        });
    }

    deleteContactById(id) {

        return new Promise((resolve, reject) => {
            requester.delete('/remove/' + id)
                .then(function (response) {
                resolve(response.data);
                })
                .catch(function (error) {
                });
        });
    }

    createContact(data) {
        return new Promise((resolve, reject) => {
            
            requester.post('/create', data )
                .then(function (response) {
                resolve(response.data);
                })
                .catch(function (error) {
                });
            
        });
    }
}

export default new API();

