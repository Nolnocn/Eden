"use strict";

var app = app || {};

// iife to set some app util functions
(function() {
    // Shows an error alert
    function handleError( message )
    {
        alert( message );
    }

    // Sends an ajax request to the server
    function sendAjax( action, data )
    {
        $.ajax( {
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: function( result, status, xhr ) {
                window.location = result.redirect;
            },
            error: function( xhr, status, error ) {
                var messageObj = JSON.parse( xhr.responseText );

                handleError( messageObj.error );
            }
        } );        
    }
    
    app.handleError = handleError;
    app.sendAjax = sendAjax;
})();