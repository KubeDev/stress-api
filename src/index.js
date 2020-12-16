const express = require('express');
const app = express();
const NodeHog = require('nodehog');
const ejs = require('ejs');
const os = require('os');

app.set('view engine', 'ejs');

app.get('/stress/:elemento/tempostress/:tempoStress/tempofolga/:tempoFolga/ciclos/:ciclos', (req, res) => {
    
    const elemento = req.params.elemento;
    const tempoStress = req.params.tempoStress * 1000;
    const tempoFolga = req.params.tempoFolga * 1000;
    const ciclos = req.params.ciclos;
    new NodeHog(elemento, tempoStress, tempoFolga, ciclos).start();
    res.send("OK");
});

app.get('/', (req, res) => {    
    res.render('index', { hostname: os.hostname() });
});

var port = process.env.SERVER_PORT || 8080;

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
});