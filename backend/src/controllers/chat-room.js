const log = require('../helpers/log.js')(module);

/**
 * Чат Комнатный на socket.io
 * @Info .JOIN => https://socket.io/docs/rooms-and-namespaces/#Rooms
 * @Info .JOIN => https://socket.io/docs/server-api/#socket-join-rooms-callback
 * @Info .BROADCAST => https://socket.io/docs/#Broadcasting-messages
 * @Info .BROADCAST => https://socket.io/docs/server-api/#Flag-%E2%80%98broadcast%E2%80%99
 * @Info .TO => https://socket.io/docs/server-api/#socket-to-room
 * @Info .IN => https://socket.io/docs/server-api/#socket-in-room
 */
exports.chatRoom = function (socket, chatNamespace) {

    console.log( '[chatRoom]' );

    /**
     * Выход из комнаты
     * @param data {author:IUser, room:IRoom}
     */
    socket.on('clientLeave', function (data) {
        log.verbose(`${data.author.name} LEAVE the room => ${data.room.name}`);

        socket.leave(data.room.name, () => {
            console.log('ON.clientLeave => ', data);

            /**
             * Сообщим что пользовватель Вышел из комнаты
             * @Params {IMessage} data
             */
            socket.broadcast.to(data.room.name).emit('serverMessage', {
                author: {
                    id: 0,
                    name: `server`,
                    avatar: `https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png`,
                },
                room: {
                    id:0,
                    name: data.room.name
                },
                text: `Пользоатель: ${data.author.name} вышел из комнаты`
            });
        });

    });



    /**
     * Подключение к комнате
     * @param data {author:IUser, room:IRoom}
     */
    socket.on('clientJoin', function(data) {
        log.verbose( `${data.author.name} JOIN the room => ${data.room.name}`);

        const messageGreetings = {
            author: {
                id: 0,
                name: `server`,
                avatar: `https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png`,
            },
            room: {
                id:0,
                name: data.room.name
            },
            text: `Welcome to the room ( ${data.room.name} ).`
        };
        socket.emit('serverMessage', messageGreetings);

        socket.join(data.room.name, () => {
            console.log( 'ON.clientJoin => ', data );

            /**
             * Сообщим что пользовватель вошел в комнату
             * @Params {IMessage} data
             */
            socket.broadcast.to(data.room.name).emit('serverMessage', {
                author: {
                    id: 0,
                    name: `server`,
                    avatar: `https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png`,
                },
                room: {
                    id:0,
                    name: data.room.name
                },
                text: `Пользоатель : ${data.author.name} вошел в комнату`
            });
        });

    });



    /**
     * Пишем в комнату
     * @Info Комнаты работают только через Namespace
     * @Params {IMessage} data
     */
    socket.on('clientMessage', function(data){
        log.verbose(`MESSAGE in the room => ${data.room.name}`);

        console.log( 'ON.clientMessage => ', data );

        /**
         * Сообщение в комнату от пользователя
         * @Params {IMessage} data
         */
        // io.to( data.room.name ).emit('serverMessage', data); // НЕ РАБОТАЕТ
        // socket.to( data.room.name ).emit('serverMessage', data); // НЕ РАБОТАЕТ

        /* Комнаты работают только через Namespace */
        // chatNamespace.to(`${data.room.name }`).emit('serverMessage', data); // РАБОТАЕТ
        chatNamespace.in( data.room.name ).emit('serverMessage', data); // РАБОТАЕТ
        // chatNamespace.to( data.room.name ).emit('serverMessage', data); // РАБОТАЕТ
        // chatNamespace.emit('serverMessage', data); // Без комнаты/просто на весь канал (chatNamespace) = Работате
    });


};
