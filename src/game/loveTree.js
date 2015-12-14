var characterMngr = require( "./characterManager.js" );

var ready = true;
var male = false;
var female = false;

// This is how my parents told me babies are made
function handleEvent( data )
{
    if( !ready )
    {
        return;
    }
    
    if( data.gender == 0 )
    {
        male = data.entered;
    }
    else
    {
        female = data.entered;
    }
    
    if( male && female )
    {
        characterMngr.addCharacter();
        ready = false;
        male = false;
        female = false;
        
        // Spam prevention delay
        setTimeout( function() {
            ready = true;
        }, 20000 );
    }
}

module.exports = handleEvent;