var io;

var EVENT_TYPE = Object.freeze( {
    CHAR_DEST_UPDATE: "charDestUpdate",
    CHAR_DEST_REACHED: "charDestReached",
    CHAR_AGE_UP: "charAgeUp",
    CHAR_DIED: "charDied",
    NEW_CHAR: "charAdded"
} );

// Gives this module access to the io var
function init( theIO ) 
{
    io = theIO;
}

// Broadcasts a message to all sockets
function sendMessage( type, data )
{
    data.timeStamp = new Date().getTime();
    io.sockets.emit( type, data );
}

module.exports = {
    init: init,
    sendMessage: sendMessage,
    EVENT_TYPE: EVENT_TYPE
};