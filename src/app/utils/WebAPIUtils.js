// import fetch from 'isomorphic-fetch';
import axios from 'axios';
import configDev from '../../config/config.dev';

// const adminUrl = `${configDev.server}/${configDev.api_root}/${configDev.api_version}/admin`;
const adminApi = axios.create({
    baseURL: `${configDev.server}/${configDev.api_root}/${configDev.api_version}/admin`,
    timeout: 10000,
   // withCredentials: true,
   // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});


const WebAPIUtils = {
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
