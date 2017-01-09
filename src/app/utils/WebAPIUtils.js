// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import config from 'config';

// const adminUrl = `${config.server}/${config.api_root}/${config.api_version}/admin`;
const adminApi = axios.create({
    baseURL: `${config.server}/${config.api_root}/${config.api_version}/admin`,
    timeout: 10000,
   // withCredentials: true,
   // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    validateStatus: status => (
        (status >= 200 && status < 300) ||
        (status >= 400 && status < 423)
    )
});

/**
 * get asac label
 * @returns {AxiosPromise}
 */
const asacLabel = () => (
    adminApi.get('/labels/asac')
);

/**
 * get boat label
 * @returns {AxiosPromise}
 */
const boatLabel = () => (
    adminApi.get('/labels/asac')
);

/**
 * get dive label
 * @returns {AxiosPromise}
 */
const diveLabel = () => (
    adminApi.get('/labels/dive')
);

/**
 * get group label
 * @returns {AxiosPromise}
 */
const groupLabel = () => (
    adminApi.get('/labels/group')
);

/**
 * get invoice label
 * @returns {AxiosPromise}
 */
const invoiceLabel = () => (
    adminApi.get('/labels/invoice')
);

/**
 * get insurance label
 * @returns {AxiosPromise}
 */
const insuranceLabel = () => (
    adminApi.get('/labels/insurance')
);

/**
 * get membership label
 * @returns {AxiosPromise}
 */
const originLabel = () => (
    adminApi.get('/labels/origin')
);

/**
 * get role label
 * @returns {AxiosPromise}
 */
const roleLabel = () => (
    adminApi.get('/labels/role')
);

/**
 * get subscription label
 * @returns {AxiosPromise}
 */
const subscriptionLabel = () => (
    adminApi.get('/labels/subscription')
);


const WebAPIUtils = {
    /*
     |----------------------------------------------------------------------------------------------
     | Labels
     |----------------------------------------------------------------------------------------------
     */
    getLabels() {
        return axios.all([
            asacLabel(), boatLabel(), diveLabel(),
            groupLabel(), invoiceLabel(), insuranceLabel(),
            originLabel(), roleLabel(), subscriptionLabel()
        ]);
    },
    getAsacLabel() {
        return asacLabel();
    },
    getBoatLabel() {
        return boatLabel();
    },
    getDiveLabel() {
        return diveLabel();
    },
    getGroupLabel() {
        return groupLabel();
    },
    getInvoiceLabel() {
        return invoiceLabel();
    },
    getInsuranceLabel() {
        return insuranceLabel();
    },
    getOriginLabel() {
        return originLabel();
    },
    getRoleLabel() {
        return roleLabel();
    },
    getSubscriptionLabel() {
        return subscriptionLabel();
    },

    /*
     |----------------------------------------------------------------------------------------------
     | Users
     |----------------------------------------------------------------------------------------------
     */
    /**
     * Get users
     *
     * @returns {Promise}
     */
    getUsers() {
        return adminApi.get('/users');
    },

    getUser(slug) {
        return adminApi.get(`/users/${slug}`);
    },

    /**
     * Add new user
     * @param user
     * @returns {AxiosPromise}
     */
    addUser(user) {
        return adminApi.post('/users', user);
    },

    /**
     * Delete user
     *
     * @param user
     *
     * @returns {Promise}
     */
    deleteUser(user) {
        return adminApi.delete(`/users/${user.slug}`);
    }
};

export default WebAPIUtils;
