const fs = require('fs');

module.exports.create = async (credentials) => {
    try {
        fs.writeFileSync('./userfatec.txt', JSON.stringify(credentials))
        return 'Sucesso';
    } catch (error) {
        return 'Falha ao salvar credenciais';
    }
}

module.exports.check = () => {
    const exist = fs.existsSync('./userfatec.txt');
    if (!exist) {
        console.warn('[wifi-fatec] ' + 'Por favor, crie as credenciais!');
        console.warn('[wifi-fatec] ' + 'wifi-fatec config <ra> <cpf>');
    }
    return exist;
}

module.exports.read = () => {
    return new Promise((resolve, reject) => {
        try {
            return resolve(JSON.parse(fs.readFileSync('./userfatec.txt')));
        } catch (error) {
            return reject('Falha ao ler credenciais');
        }
    })
}