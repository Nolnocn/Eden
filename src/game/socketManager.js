// Module responsible for setting up sockets

var characterMngr = require( "./characterManager.js" );

//var users = {};

// Initializes all socket events and callbacks
function setupSocket( socket )
{
    console.log( "\n=== New Connection ===" );
    characterMngr.onPlayerAdded( socket );
    
    onDisconnect( socket );
    
    /*if( socket.name )
    {
        users[ socket.name ] = socket;
    }*/
    
    //console.log( socket.character );
    characterMngr.print();
}

function onDisconnect( socket )
{
    socket.on( "disconnect", function() {
        console.log( "\n=== User Disconnected ===" );
        characterMngr.onPlayerRemoved( socket );
        characterMngr.print();
    } );
}

// Initializes socket io vars
function socketManager( io )
{
    io.sockets.on( "connection", setupSocket );
    
    characterMngr.addCharacter();
    characterMngr.addCharacter();
}

module.exports = socketManager;
