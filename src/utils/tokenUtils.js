export const setAuthToken = (token) => {
    window.localStorage.setItem('token', token);
};

export const deleteAuthToken = () => {
    window.localStorage.removeItem('token');
};

export const getAuthToken = () =>
    (window && window.localStorage ? window.localStorage.getItem('token') : null);
