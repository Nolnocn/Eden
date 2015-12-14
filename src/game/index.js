// Initializes game stuff
function init()
{
    var characterManager = require( "./characterManager.js" );
    characterManager.init();
    
    var worldManager = require( "./worldManager.js" );
    worldManager.init();

    var gameLoop = require( "./gameLoop.js" );
    gameLoop.init();
    
    console.log( "Game initialized" );
}

module.exports.init = init;