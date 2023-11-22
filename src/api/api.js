
import axios from 'axios';

import { handleUnAuthorized, restoreToken } from './utils';

const localUrl = 'http://127.0.0.1:5239';


export const login = (email, password) => {

    return axios.post(localUrl + '/Login', { email, password })
        .then(response => {
            console.log(response, 'response');
            if(response.data.token) {
                
                localStorage.setItem('token', response.data.token);
                window.dispatchEvent(new Event('storage'));
            }
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};

export const fetchUserData = () => {
    return axios.get(localUrl + "/UserData", {
        headers: {
            Authorization: `Bearer ${restoreToken()}`
        }
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log(error);
            handleUnAuthorized(error)
            throw error;
        });
};

export const register = (userData) => {
    return axios.post(localUrl + '/Register', userData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
}
export const getCourses = () => {
    return axios.get(localUrl + '/courses')
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => console.log(error));
}
export const saveUserCourses = async (courseIdArray) => {
    const config = {
        headers: {
            Authorization: `Bearer ${restoreToken()}`
        }
    };
    const url = `${localUrl}/assign-course-to-user/${courseIdArray}`;

    return await axios.post(url, null, config)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            handleUnAuthorized(error)

            console.log(error
         )});
}

export const removeUserCourse = async (courseIdToRemove) => {
    const config = {
        headers: {
            Authorization: `Bearer ${restoreToken()}`
        }
    };

    const url = `${localUrl}/delete-course-from-user/${courseIdToRemove}`;

    try {
        const response = await axios.delete(url,config);
        console.log("response" + response);
        return response.data;
    } catch (error) {
        handleUnAuthorized(error)
        console.log(error, 'in api');
        throw error;
    }
};
export const adminLogin = (email, password) => {
    return axios.post(localUrl + '/admin/login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw error;
        });
};
