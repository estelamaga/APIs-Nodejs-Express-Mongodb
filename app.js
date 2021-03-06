const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');

//Conexão com o banco de dados

const url = config.bd;
const options = { reconnectTries: Number.MAX_VALUE, recconectInterval: 500,  poolSize: 5, useNewUrlParser: true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('erro na conexão com o banco de dados: ' + err);
})

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco de dados');
})

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco');
})
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

//Associar estas 2 instacias no app 
app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000);

module.exports = app;