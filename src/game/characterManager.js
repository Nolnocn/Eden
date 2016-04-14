// Module for keeping track of the characters and the player controlling them
var Character = require( "./Character.js" );
var broadcast = require( "./network/broadcast.js" );

var charCount = 0;
var characters = [];
var aiCharacters = [];
var spectatorQueue = [];

// Returns true if there ai controlled characters
function hasAICharacter()
{
    return ( aiCharacters.length > 0 );
}

// Assigns an ai character to a player
function assignPlayerCharacter( socket )
{
    var character = aiCharacters.pop();
    socket.character = character;
}

// Adds a new character
function addCharacter( character )
{
    if( !character )
    {
        // generate a character
        character = new Character();
    }
    
    character.id = charCount;
    
    characters.push( character );
    
    broadcast.sendMessage( broadcast.EVENT_TYPE.NEW_CHAR, character );
    setCharacterController( character );
    
    charCount++;
}

// Removes a character
function removeCharacter( character )
{
    var charIndex = characters.indexOf( character );
    if( charIndex > -1 )
    {
        characters.splice( charIndex, 1 );
        aiCharacters.splice( aiCharacters.indexOf( character ), 1 );
    }
}

// Sets the character to be controlled by ai or a player from the queue
function setCharacterController( character )
{
    if( spectatorQueue.length > 0 )
    {
        var player = spectatorQueue.shift();
        player.character = character;
        player.emit( "setCharacter", { id: player.character.id } );
    }
    else
    {
        aiCharacters.push( character );
    }
}

// Handles assigning a character to new player connections
function onPlayerAdded( socket )
{
    sendCharacterData( socket );
    
    if( socket.character )
    {
        socket.emit( "setCharacter", { id: socket.character.id } );
        return;
    }
    
    setCharacter( socket );
}

// Assigns a character to the socket or puts them in the spectator queue
function setCharacter( socket )
{
    if( hasAICharacter() )
    {
        assignPlayerCharacter( socket );
        socket.emit( "setCharacter", { id: socket.character.id } );
    }
    else
    {
        spectatorQueue.push( socket );
        socket.emit( "setSpectator", { queuePos: spectatorQueue.length } );
    }
}

// Handles removing a character from player disconnections
function onPlayerRemoved( socket )
{
    if( socket.character )
    {
        socket.character.destination = socket.character.position;
        socket.broadcast.emit( "charDestUpdate", socket.character );
        // hand the character over to a spectator / ai
        setCharacterController( socket.character );
    }
    else
    {
        // remove spectator
        spectatorQueue.splice( spectatorQueue.indexOf( socket ), 1 );
    }
}

// Sends all characters to a single socket
// Used for initialization on connection
function sendCharacterData( socket )
{
    socket.emit( "charData", characters );
}

// Updates all characters
function updateCharacters( dt )
{
    for( var i = 0; i < characters.length; i++ )
    {
        characters[ i ].update( dt );
    }
}

// Creates the starting characters at the begining of the game
function init()
{
    addCharacter( new Character( 0, 1, { x: 700, y: 600} ) );
    addCharacter( new Character( 1, 1, { x: 900, y: 600} ) );
    
    // Create some fresh characters every few minutes
    // To keep the game going
    setTimeout( init, 300000 );
}

// Debug printing
function print()
{
    console.log( "Num Characters: " + characters.length );
    //console.log( characters );
    console.log( "Num AI Characters: " + aiCharacters.length );
    //console.log( aiCharacters );
    console.log( "Num Spectators: " + spectatorQueue.length );
    //console.log( spectatorQueue );
}

module.exports = {
    onPlayerAdded: onPlayerAdded,
    onPlayerRemoved: onPlayerRemoved,
    setCharacter: setCharacter,
    addCharacter: addCharacter,
    removeCharacter: removeCharacter,
    //sendCharacterData: sendCharacterData,
    updateCharacters: updateCharacters,
    init: init,
    print: print
};
