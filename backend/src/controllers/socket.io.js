const log = require('../helpers/log.js')(module);
const myconfig = require('../helpers/myconfig');
const socketIO = require('socket.io');

/**
 * Получение и Отправка
 * @Info https://socket.io/
 * @Info https://socket.io/docs/server-api/
 * @param server
 */
module.exports = function(server) {
    const io = new socketIO(server, myconfig.socketIo);
    // io.origins('');

    /**
     * socket.io
     * .of('/chat') - register namespace
     * .on - слушает
     * .emit - Отправляет
     * @Info .JOIN => https://socket.io/docs/rooms-and-namespaces/#Rooms
     * @Info .JOIN => https://socket.io/docs/server-api/#socket-join-rooms-callback
     * @Info .BROADCAST => https://socket.io/docs/#Broadcasting-messages
     * @Info .BROADCAST => https://socket.io/docs/server-api/#Flag-%E2%80%98broadcast%E2%80%99
     * @Info .TO => https://socket.io/docs/server-api/#socket-to-room
     * @Info .IN => https://socket.io/docs/server-api/#socket-in-room
     */
    const chatNamespace = io.of('/chat');

    chatNamespace.on('connection', (socket) => {

        /**
         * Обьект Сообщений
         * @param data IMessage {
                            author: {
                                id: 0,
                                name: 'socket.io.js',
                                avatar: 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png',
                            },
                            room: {
                                id:0,
                                name: 'server'
                            },
                            text: 'Hello World'
                        }
         */
        const defaultUser = {
            author: {
                id: 0,
                name: `server`,
                avatar: `https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png`,
            },
            room: {
                id:0,
                name: `Namespace '/chat' `
            },
            text: `Connected to server-chat Namespace.`
        };
        socket.emit('serverMessage', defaultUser);
        log.info('New user connected to server.');
        // console.log( socket.id );



        // require('./chat-echo').echoChat(socket, chatNamespace);
        require('./chat-room').chatRoom(socket, chatNamespace);



        allEvents(socket, 'chatNamespace');

    });


    /**
     * Повесил все возможные прослушки
     * @param server Место от которого стартует прослушка
     * @param namespace
     */
    function allEvents(server, namespace){

        /**
         * Слушаем
         */
        server.on('disconnect',(disconnect)=> {
            log.info( namespace + ' disconnect' );
            console.log( namespace + ' disconnect = ', disconnect );
        });


        /**
         * Слушаем
         */
        server.on('connect_timeout',(connect_timeout)=> {
            log.info( namespace + ' connect_timeout' );
            console.log( namespace + ' connect_timeout = ', connect_timeout );
        });

        /**
         * Слушаем
         */
        server.on('connect_failed',(connect_failed)=> {
            log.info( namespace + ' connect_failed' );
            console.log( namespace + ' connect_failed = ', connect_failed );
        });

        /**
         * Слушаем
         */
        server.on('connect_error',(connect_error)=> {
            log.error( namespace + ' connect_error ' );
            console.log( namespace + ' connect_error =', connect_error );
        });


        /**
         * Слушаем
         */
        server.on('reconnect',(reconnect)=> {
            log.info( namespace + ' reconnect ' );
            console.log( namespace + ' reconnect =', reconnect );
        });

        /**
         * Слушаем
         */
        server.on('reconnecting',(reconnecting)=> {
            log.info( namespace + ' reconnecting' );
            console.log( namespace + ' reconnecting =', reconnecting );
        });

        /**
         * Слушаем
         */
        server.on('reconnect_attempt',(reconnect_attempt)=> {
            log.info( namespace + ' reconnect_attempt' );
            console.log( namespace + ' reconnect_attempt =', reconnect_attempt );
        });

        /**
         * Слушаем
         */
        server.on('reconnect_failed',(reconnect_failed)=> {
            log.info( namespace + ' reconnect_failed' );
            console.log( namespace + ' reconnect_failed = ', reconnect_failed );
        });

        /**
         * Слушаем
         */
        server.on('reconnect_error',(reconnect_error)=> {
            log.error( namespace + ' reconnect_error _ ' );
            console.log( namespace + ' reconnect_error = ', reconnect_error );
        });

        /**
         * Слушаем
         */
        server.on('error',(error)=> {
            log.error( namespace + ' error _ ', error );
            console.log( namespace + ' error = ', error );
        });
    }

    allEvents(io, 'io');

};
