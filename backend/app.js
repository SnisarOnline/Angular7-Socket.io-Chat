const express = require('express');
const path = require('path');
const http = require('http');
const myconfig = require('./src/helpers/myconfig');
const log = require('./src/helpers/log')(module);

const app = express();

myconfig.homePath = __dirname;

// устанавливаем базывую директорию статических Файлов (html,js,css ... ) "frontend фалов"
app.use(express.static( path.join(myconfig.homePath, '..', 'frontend', 'dist') ));


//================================================================//
//********** Routes **********************************************//
//================================================================//
// const router = require('./src/routes');
// app.use('/api', router.api );
app.get('**', (req,res) => {
    res.sendFile(path.join(myconfig.homePath, '..', 'frontend', 'dist', 'index.html') )
});


//================================================================//
//********** Error ***********************************************//
//================================================================//
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        title: 'Oops...',
        message: error.message,
        error: myconfig.IS_DEVELOPMENT ? error : {},
    });
});
//================================================================//
//********** Critical error **************************************//
//================================================================//
process.on('uncaughtException', function (err) {
    log.error((new Date).toUTCString() + ' uncaughtException: ', err.message);
    log.error(err.stack);
    process.exit(1);
});



//================================================================//
//********** SocketIO ********************************************//
//================================================================//
const server = http.createServer(app);
require('./src/controllers/socket.io')(server);


server.listen(myconfig.port, () => {
    log.info( ` Server listening on port = ${myconfig.port}`);
    log.http( ` Server listening on port = ${myconfig.port}`);
    log.warn( ` Server listening on port = ${myconfig.port}`);
    log.error(` Server listening on port = ${myconfig.port}`);
    log.verbose( `Server listening on port = ${myconfig.port}`);
    log.debug(` Server listening on port = ${myconfig.port}`);
    log.silly(` Server listening on port = ${myconfig.port}`);
});

