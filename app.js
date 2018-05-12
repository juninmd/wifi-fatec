#!/usr/bin/env node
const program = require('commander');
const version = require('./package.json').version;
const wifi = require('./connect');
const config = require('./config');

if (process.argv.length == 2) {
    console.log('[wifi-fatec] ' + 'Verifique os comandos com $ wifi-fatec --help')
}

program
    .command('check')
    .description('Verifica a versão do wifi-fatec-connector')
    .action((req, optional) => {
        console.log('[wifi-fatec] ' + version);
    });

program
    .command('config')
    .description('Configura as credenciais do wifi')
    .action(async (req, optional) => {
        const c = process.argv;

        if (c.length != 5) {
            console.log('[wifi-fatec] ' + 'Por favor informe algo como:');
            console.log('[wifi-fatec] ' + 'wifi-fatec config <ra> <cpf>');
            return;
        }

        await config.create({
            user: c[3],
            pass: c[4]
        })
        console.log('[wifi-fatec] ' + 'credenciais criadas com sucesso!');
    });

program
    .command('on')
    .description('Conecta ao wifi da fatec')
    .action(async (req, optional) => {
        if (config.check()) {
            try {
                const r = await wifi(true);
                console.log('[wifi-fatec] ' + r);
            } catch (error) {
                console.error('[wifi-fatec] ' + error);
            }
        }
    });

program
    .version(version)
    .command('off')
    .description('Desloga do wifi da fatec')
    .action(async (req, optional) => {
        if (config.check()) {
            try {
                const r = await wifi(false);
                console.log('[wifi-fatec] ' + r);
            } catch (error) {
                console.error('[wifi-fatec] ' + error);
            }
        }
    });


program.parse(process.argv);