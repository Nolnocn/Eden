"use strict";

(function() {
    function init()
    {
        if( Game.getInstance() )
        {
            var socket = io.connect();
            socket.on( 'connect', onConnection );
        }
    }

    function onConnection()
    {
        console.log( "Connected" );
    }

    window.onload = init;
})();
