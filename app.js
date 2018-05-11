#!/usr/bin/env node
const program = require('commander');
const version = require('./package.json').version;
const wifi = require('./connect');
const config = require('./config');

if (process.argv.length == 2) {
    console.log('Verifique os comandos com $ wifi-fatec --help')
}

program
    .command('check')
    .description('Verifica a versão do wifi-fatec-connector')
    .action((req, optional) => {
        console.log(version);
    });

program
    .command('config')
    .description('Configura as credenciais do wifi')
    .action(async (req, optional) => {
        const c = process.argv;

        if (c.length != 5) {
            console.log('Por favor informe algo como:');
            console.log('wifi-fatec <ra> <cpf>');
            return;
        }

        result = await config.create({
            user: c[3],
            pass: c[4]
        })
        console.log(result);
    });

program
    .command('on')
    .description('Conecta ao wifi da fatec')
    .action(async (req, optional) => {
        if (config.check())
            await wifi(true);
    });

program
    .version(version)
    .command('off')
    .description('Desloga do wifi da fatec')
    .action(async (req, optional) => {
        if (config.check())
            await wifi(false);
    });


program.parse(process.argv);