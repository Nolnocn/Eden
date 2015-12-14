var characterMngr = require( "./characterManager.js" );

var FIXED_DT = ( 1 / 30 ) * 1000;
var prevTime;

// Periodic update
function update()
{
    var dt = ( Date.now() - prevTime ) * 0.001;
    prevTime = Date.now();
    
    characterMngr.updateCharacters( dt );
}

// Kicks off the updating
function init()
{
    prevTime = Date.now();
    setInterval( update, FIXED_DT );
}

module.exports = {
    init: init
};
