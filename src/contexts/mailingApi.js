import axios from 'axios';

export function sendEmail(email) {
    return axios.post('http://127.0.0.1:3000/mailing-list/subscribe', { email });
};
