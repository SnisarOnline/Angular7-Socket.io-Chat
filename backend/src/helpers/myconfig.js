//================================================================//
//********** Common **********************************************//
//================================================================//
let myconfig = {
    port: process.env.PORT || 3000,
    companyName: "Stock_Market",
    homePath: "",
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development'
};

    // path: '/api/chat',
myconfig.socketIo = {
    reconnection: false,
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
};
//================================================================//
//********** Mongoose ********************************************//
//================================================================//
myconfig.mongoose = {
    uri: "mongodb://127.0.0.1:27017/egChat",
    options: {
        useCreateIndex: true,
        useNewUrlParser: true,
        // autoIndex: process.env.NODE_ENV == 'production', // тогда в схеме "unique:true" не будет работать https://mongoosejs.com/docs/guide.html#indexes
    }
};

//================================================================//
//********** Authorization ***************************************//
//================================================================//
myconfig.authorization = {
    options: {}
};

//================================================================//
//********** Session *********************************************//
//================================================================//
myconfig.session = {
    options: {}
};



module.exports = myconfig;