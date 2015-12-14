// Module responsible for setting up sockets

var characterMngr = require( "../characterManager.js" );
var worldMngr = require( "../worldManager.js" );

//var users = {};

// Initializes all socket events and callbacks
function setupSocket( socket )
{
    //console.log( "\n=== New Connection ===" );
    characterMngr.onPlayerAdded( socket );
    worldMngr.sendWorldData( socket );
    
    onDisconnect( socket );
    setupRecievers( socket );
    
    //characterMngr.print();
}

// Sets up the socket's disconnect function
function onDisconnect( socket )
{
    socket.on( "disconnect", function() {
        //console.log( "\n=== User Disconnected ===" );
        characterMngr.onPlayerRemoved( socket );
        //characterMngr.print();
    } );
}

function setupRecievers( socket )
{
    socket.on( "setDestination", function( data ) {
        socket.character.position = data.position;
        socket.character.destination = data.destination;
        data.id = socket.character.id;
        socket.broadcast.emit( "charDestUpdate", data );
    } );
    
    socket.on( "reachedDestination", function( data ) {
        socket.character.position = data.position;
        data.id = socket.character.id;
        socket.broadcast.emit( "charDestReached", data );
    } );
    
    socket.on( "playerCharacterDeath", function( data ) {
        socket.character = undefined;
        characterMngr.setCharacter( socket );
    } );
    
    socket.on( "lookingForLove", function( data ) {
        var loveTree = require( "../loveTree.js" );
        loveTree( data );
    } );
}

// Initializes socket io vars
function socketManager( io )
{
    io.sockets.on( "connection", setupSocket );
}

module.exports = socketManager;
