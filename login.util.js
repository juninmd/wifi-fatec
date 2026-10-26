const config = require('./config');

module.exports = async (flag) => {
    const person = await config.read();
    return options = {
        url: `http://172.20.0.3/webfig/${flag ? 'login' : 'logout'}`,
        method: 'POST',
        body: new URLSearchParams({ dst: '', popup: 'true', username: person.user, password: person.pass }).toString(),
        headers: {
            Cookie: `username=${encodeURIComponent(person.user)}`,
        }
    };
}