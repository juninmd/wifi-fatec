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
        console.warn('Por favor, crie as credenciais!');
    }
    return exist;
}

module.exports.read = () => {
    return new Promise((resolve, reject) => {
        try {
            return JSON.parse(fs.readFileSync('./userfatec.txt'));
        } catch (error) {
            throw 'Falha ao ler credenciais';
        }
    })
}