const express = require('express');
const expressHandlebars = require('express-handlebars');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

dotenv.config(__dirname);

app.engine('hbs', expressHandlebars.engine({ defaultLayout: null }));

app.set('view engine', 'hbs');

app.set ('views', './public/views');

app.set(express.static(path.join(__dirname, 'public')));

app.get('/', (req, response) => {
    response.render('exercicio1', {
        titulo: 'Exercício 1',
        descricao: 'Crie um programa que receba um valor numérico de um formulário (POST) e exiba na tela se o valor é POSITIVO, NEGATIVO ou IGUAL A ZERO.',
    });
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Servidor Iniciado com sucesso na porta ${process.env.SERVER_PORT}.`);
});