const config = require('./config');

module.exports = async (flag) => {
    const person = await config.read();
    return options = {
        url: `http://172.20.0.3/webfig/${flag ? 'login' : 'logout'}`,
        method: 'POST',
        body: `dst=&popup=true&username=${person.user}&password=${person.pass}`,
        headers: {
            Cookie: `username=${person.user}`,
        }
    };
}