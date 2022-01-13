const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const apiRouter = require('./Routes/api.js');
const cors = require('cors');

const app = express();
require('./Db');


app.use(express.static(__dirname+'/workshop-online/dist/workshop-online'));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/workshop-online/dist/workshop-online/index.html'));
});

//Aqui van las configuraciones CORS
const corsOptions = {origin: "http://localhost:8080/"}
app.use(cors({
    origin: "http://localhost:8080/",
    credentials: true
}));
//Fin configuraciones CORS

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.use(express.static(__dirname + '/workshop-online'));

app.listen(port, () => {
    console.log("Servidor iniciado en el puerto "+port);
})




