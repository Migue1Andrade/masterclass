const jwt_decode = require('jwt-decode');

const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        const decoded = jwt_decode(token);

        return decoded.id;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
};

const userId = getUserIdFromToken();

if (userId) {
    console.log('User ID:', userId);
} else {
    console.log('User ID could not be retrieved.');
}

module.exports = userId;