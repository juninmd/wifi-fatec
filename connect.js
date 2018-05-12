const request = require('request');
const wifi = require('node-wifi');
const login = require('./login.util');

wifi.init({
    iface: null
});

async function fatecConnect() {
    try {
        console.info('[wifi-fatec] ' + 'Tentativa de conectar ao WIFI da Fatec');
        const tryConnect = await wifi.connect({ ssid: "FATEC", password: "f.franca*" });
        console.info('[wifi-fatec] ' + 'Conectado com sucesso!');
    } catch (error) {
        throw error;
    }
}

async function wifiConnect(enabled = true, retry = 0) {
    try {
        const wifiResult = await wifi.getCurrentConnections();

        if (wifiResult.length == 1 && wifiResult[0].ssid === 'FATEC') {
            return await connection(enabled);
        }

        if (retry === 1) {
            throw new Error('Não conseguimos conectar e logar ao wifi da fatec.')
        }

        console.error('[wifi-fatec] ' + 'Você não está no Wifi da FATEC!');
        await fatecConnect();
        retry++;
        return wifiConnect(enabled, retry)
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function makeRequest(options, enabled) {
    return new Promise((resolve, reject) => {
        request(options, (err, response) => {
            if (err) {
                return reject(err);
            }
            if (enabled) {
                if (response.body.indexOf('You are logged in') > 1) {
                    return resolve('logado com sucesso');
                }
                return reject('Xi deu erro ao logar');
            }
            else if (!enabled) {
                if (response.body.indexOf('session time') > 1) {
                    return resolve('logout com sucesso');
                };
                return reject('Xi deu erro ao deslogar');
            }
        })
    })
}

async function connection(enabled) {
    const options = await login(enabled);
    return await makeRequest(options, enabled);
}

module.exports = (enabled) => wifiConnect(enabled);