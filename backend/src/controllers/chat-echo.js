const log = require('../helpers/log.js')(module);

/**
 * Ехо-Чатикна на socket.io
 * @Info .JOIN => https://socket.io/docs/rooms-and-namespaces/#Rooms
 * @Info .JOIN => https://socket.io/docs/server-api/#socket-join-rooms-callback
 * @Info .BROADCAST => https://socket.io/docs/#Broadcasting-messages
 * @Info .BROADCAST => https://socket.io/docs/server-api/#Flag-%E2%80%98broadcast%E2%80%99
 * @Info .TO => https://socket.io/docs/server-api/#socket-to-room
 * @Info .IN => https://socket.io/docs/server-api/#socket-in-room
 *
 * @param socket пользователь
 * @param io чат-сервер для всех
 */
exports.echoChat = function (socket, io) {

    console.log( '[сhatEcho]' );

    socket.on('clientMessage', (data) => {
        log.verbose(`MESSAGE in the room => ${data.room.name}`);
        console.log( '[сhatEcho] ON.clientMessage => ', data );

        // socket.emit('serverMessage', data); // самому себе - Ехо
        io.emit('serverMessage', data); // в общую комнату
    } );

};
