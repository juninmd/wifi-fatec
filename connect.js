const wifi = require('node-wifi');
const login = require('./login.util');

// A senha do wifi da Fatec e um segredo compartilhado: nunca vai no codigo.
// Defina FATEC_WIFI_PASSWORD no ambiente (ou no .env, que fica fora do git).
const SSID = process.env.FATEC_SSID || 'FATEC';

wifi.init({
    iface: null
});

async function fatecConnect() {
    const password = process.env.FATEC_WIFI_PASSWORD;
    if (!password) {
        throw new Error(
            '[wifi-fatec] FATEC_WIFI_PASSWORD nao definida: exporte a senha do wifi antes de conectar'
        );
    }
    try {
        console.info('[wifi-fatec] ' + 'Tentativa de conectar ao WIFI da Fatec');
        await wifi.connect({ ssid: SSID, password });
        await timeSleep();
        console.info('[wifi-fatec] ' + 'Conectado com sucesso!');
    } catch (error) {
        throw error;
    }
}

async function fatecDisconnect() {
    try {
        console.info('[wifi-fatec] ' + 'Tentativa de desconectar ao WIFI da Fatec');
        const wifiResult = await wifi.getCurrentConnections();
        if (wifiResult.length > 0)
            await wifi.disconnect();
        await timeSleep();
        console.info('[wifi-fatec] Desconectado e feito logout com sucesso');
    } catch (error) {
        throw error;
    }
}

function timeSleep() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({});
        }, 2500);
    });

}
async function wifiConnect(enabled = true, retry = 0) {
    try {
        const wifiResult = await wifi.getCurrentConnections();

        if (wifiResult.length == 1 && wifiResult[0].ssid === SSID) {
            return await connection(enabled);
        }
        else if (!enabled) {
            return 'Você já está desconectado!';
        }

        if (retry === 1) {
            throw new Error('Não conseguimos conectar e logar ao wifi da fatec.')
        }

        console.error('[wifi-fatec] ' + 'Você não está no Wifi da FATEC!');
        await fatecConnect();
        retry++;
        return wifiConnect(enabled, retry)
    } catch (error) {
        throw error;
    }
}

function makeRequest(options, enabled) {
    return new Promise((resolve, reject) => {
        // Buffer body: fetch would add text/plain Content-Type, which request never sent.
        // redirect manual: request did not follow redirects on POST either.
        fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: Buffer.from(options.body),
            redirect: 'manual',
        })
            .then(response => response.text())
            .then(async (body) => {
                if (enabled) {
                    if (body.indexOf('You are logged in') > 1) {
                        return resolve('logado com sucesso');
                    }
                    return reject('Xi deu erro ao logar');
                }
                else if (!enabled) {
                    if (body.indexOf('session time') > 1 ||
                        body.indexOf('Hotspot redirect') > 1) {
                        return await fatecDisconnect();
                    };
                    return reject('Xi deu erro ao deslogar');
                }
            })
            .catch(reject);
    })
}

async function connection(enabled) {
    const options = await login(enabled);

    return await makeRequest(options, enabled);
}

module.exports = (enabled) => wifiConnect(enabled);