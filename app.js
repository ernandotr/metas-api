const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('./models/Metas');

const Meta = mongoose.model('Meta');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers","X-PINGOTHER ,Content-Type, Authorization");
    app.use(cors());
    next();
})

// Senha: s9cHFzsX6p9FBGa
mongoose.connect('mongodb://metasapi:s9cHFzsX6p9FBGa@mongo_metasapi:27017/metasapi', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Conexão com o BD MongoDB realizada com sucesso!");
}).catch((err) => {
    console.log("Conexão com o BD MongoDB não realizada com sucesso: "+ err);
});

app.get('/metas', async function(req, res){
    await Meta.find({}).then((metas) =>{
        return res.json({
            error: false,
            metas
        });
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum registro encontrado!"
        })
    });
   
});

app.post('/metas', async (req, res) => {

    //await sleep(3000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    
    await Meta.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Erro: Meta não cadastrada com sucesso!"
        });
    });
    return res.json({
        error: false,
        message: "Meta cadastrada com sucesso!"
    })
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Servidor executando na porta: ", port);
});