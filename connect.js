const request = require('request');
const wifi = require('node-wifi');
const login = require('./login.util');

wifi.init({
    iface: null
});

async function fatecConnect() {
    try {
        console.info('Tentativa de conectar ao WIFI da Fatec');
        const tryConnect = await wifi.connect({ ssid: "FATEC", password: "f.franca*" });
        console.info('Conectado com sucesso!');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function wifiConnect(enabled = true) {
    try {
        const wifiResult = await wifi.getCurrentConnections();

        if (wifiResult.length == 1 && wifiResult[0].ssid === 'FATEC') {
            return await connection(enabled);
        }
        console.error('Você não está no Wifi da FATEC!');
        return await fatecConnect();
    } catch (error) {
        throw error;
    }
}

function connection(enabled) {
    return new Promise(async (resolve, reject) => {
        const options = await login(enabled);
        request(options, (err, response) => {
            if (err) {
                return reject(err);
            }
            if (enabled && response.body.indexOf('You are logged in') > 1) {
                return resolve('logado com sucesso');
            }
            else if (!enabled && response.body.indexOf('session time') > 1) {
                return resolve('logout com sucesso');
            };
        })
    });
}

module.exports = (enabled) => wifiConnect(enabled);