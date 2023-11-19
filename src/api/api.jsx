
import axios from 'axios';
const localUrl = 'http://127.0.0.1:5239';

export const login = (email, password) => {
    return axios.post(localUrl + '/Login', { email, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
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
    return axios.get(localUrl + '/courses',)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => console.log(error));
}
export const saveUserCourses = (token, courseIdArray) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const data = {
        courseId: courseIdArray
    };
    const url = `${localUrl}/assign-course-to-user/${courseIdArray}`;

    return axios.post(url, null, config)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => console.log(error));
}

export const removeUserCourse = (courseIdToRemove, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const url = `${localUrl}/delete-course-from-user/${courseIdToRemove}`;

    try {
        const response = axios.delete(url,config);
        console.log("response" + response);
        return response.data;
    } catch (error) {
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
