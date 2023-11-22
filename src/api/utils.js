export const handleUnAuthorized = (error) => {
    if(error && error.response && error.response.status === 401) {
        localStorage.removeItem('token')
        window.dispatchEvent(new Event('storage'));
        // history.push('/login')
    }
}


export const restoreToken = () => {
    return localStorage.getItem('token');
}